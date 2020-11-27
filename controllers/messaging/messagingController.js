// Dependencies
const express = require("express");
const router = express.Router();

// Direct messaging routes
router.get("/messages", (req, res) => {
  res.render("messages");
});

router.get("/messages/:conversationid", (req, res) => {
  res.render("messages", {
    conversationid: req.params.conversationid,
  });
});

router.post("/api/messages/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
