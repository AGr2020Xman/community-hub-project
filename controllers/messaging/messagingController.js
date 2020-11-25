module.exports = (app) => {
  app.get("/messages", (req, res) => {
    res.render("messages", req.params);
  });
};
