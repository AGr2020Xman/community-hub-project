// Dependencies
const express = require('express');

const router = express.Router();
const db = require('../../config/initFirebase');
const { checkAuthenticated } = require('../../config/middleware/checkAuth');

// Helpers
const createNewConversation = async (participants, messageData) => {
  const conversationRef = db.collection('conversations').doc();
  await conversationRef.set({
    participants,
  });
  const messageRef = conversationRef.collection('messages').doc();
  await messageRef.set(messageData);
};

const getMessageHeaders = async (originId) => {
  // Create a headers array
  const headers = [];

  // Get all conversation references where originId exists in participants
  const conversationsRef = db.collection('conversations');
  const convSnapshot = await conversationsRef
    .where('participants', 'array-contains', originId)
    .get();
  /* eslint-disable */
  for (const conversation of convSnapshot.docs) {
    const convObj = {
      id: conversation.id,
      participant: conversation.data().participants.find((id) => id !== originId),
    };
    await conversationsRef
      .doc(conversation.id)
      .collection('messages')
      .orderBy('timestamp')
      .limit(1)
      .get()
      .then((snapshot) => {
        convObj.messageData = snapshot.docs[0].data();
      });
    headers.push(convObj);
  }
  return headers;
};
/* eslint-enable */

const getConversation = async (id) => {
  const conversationsRef = db.collection('conversations').doc(id).collection('messages');
  const messages = [];
  const convSnapshot = await conversationsRef.orderBy('timestamp').get();
  /* eslint-disable */
  for (const message of convSnapshot.docs) {
    messages.push(message.data());
  }
  /* eslint-enable */
  return messages;
};

// Direct messaging routes
router.get('/messages', checkAuthenticated, (req, res) => {
  res.render('messages');
});

router.get('/messages/:conversationid', checkAuthenticated, (req, res) => {
  res.render('messages', {
    conversationid: req.params.conversationid,
  });
});

router.get('/api/messages/:conversationid', async (req, res) => {
  const conversation = await getConversation(req.params.conversationid);
  res.json(conversation);
});

router.get('/api/messages', async (req, res) => {
  if (req.query.headers && req.query.originId) {
    const headers = await getMessageHeaders(req.query.originId);
    res.json(headers);
  }
});

router.post('/api/messages/', (req, res) => {
  const participants = [req.body.from, req.body.to];
  createNewConversation(participants, req.body);
  res.json(req.body);
});

router.post('/api/emailgateway', (req, res) => {
  const parsedNick = req.body.to.split('@');
  const messageData = {
    from: req.body.from,
    to: parsedNick[0],
    timestamp: new Date(),
    text: req.body.text,
  };
  const participants = [req.body.from, parsedNick[0]];
  createNewConversation(participants, messageData);
  res.json(messageData);
});

module.exports = router;
