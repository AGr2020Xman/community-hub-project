// Dependencies
const path = require("path");

// Routing
module.exports = (app) => {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/placeholder.html"));
  });
};
