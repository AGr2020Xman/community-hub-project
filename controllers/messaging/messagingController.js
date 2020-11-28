// Dependencies
const express = require("express");
const router = express.Router();
const db = require("../../config/initFirebase");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../../config/middleware/checkAuth");

// Helpers
const createNewConversation = async (participants, messageData) => {
  const conversationRef = db.collection("conversations").doc();
  await conversationRef.set({
    participants: participants,
  });
  const messageRef = conversationRef.collection("messages").doc();
  await messageRef.set(messageData);
};

const getMessageHeaders = async (originId) => {
  // Create a headers array
  const headers = [];

  // Get all conversation references where originId exists in participants
  const conversationsRef = db.collection("conversations");
  const convSnapshot = await conversationsRef
    .where("participants", "array-contains", originId)
    .get();

  for (const conversation of convSnapshot.docs) {
    const convObj = {
      id: conversation.id,
      participant: conversation
        .data()
        .participants.find((id) => id !== originId),
    };
    const msgSnapshot = await conversationsRef
      .doc(conversation.id)
      .collection("messages")
      .orderBy("timestamp")
      .limit(1)
      .get()
      .then((snapshot) => {
        convObj.messageData = snapshot.docs[0].data();
      });
    headers.push(convObj);
  }
  return headers;
};

const getConversation = async (id) => {
  const conversationsRef = db
    .collection("conversations")
    .doc(id)
    .collection("messages");
  const messages = [];
  const convSnapshot = await conversationsRef.orderBy("timestamp").get();
  for (const message of convSnapshot.docs) {
    messages.push(message.data());
  }
  return messages;
};

// Direct messaging routes
router.get("/messages", checkAuthenticated, (req, res) => {
  res.render("messages");
});

router.get("/messages/:conversationid", checkAuthenticated, (req, res) => {
  res.render("messages", {
    conversationid: req.params.conversationid,
  });
});

router.get("/api/messages/:conversationid", async (req, res) => {
  const conversation = await getConversation(req.params.conversationid);
  res.json(conversation);
});

router.get("/api/messages", async (req, res) => {
  if (req.query.headers && req.query.originId) {
    const headers = await getMessageHeaders(req.query.originId);
    res.json(headers);
  }
});

router.post("/api/messages/", (req, res) => {
  console.log(req.body);
  const participants = [req.body.from, req.body.to];
  createNewConversation(participants, req.body);
  res.json(req.body);
});

module.exports = router;
