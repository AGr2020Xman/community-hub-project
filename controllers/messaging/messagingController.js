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

module.exports = router;
