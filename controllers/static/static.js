const express = require('express');
const router = express.Router();

// Get route for index page
router.get("/", (req, res) => {
  res.render("index", { layout: "main" });
});

module.exports = router;
