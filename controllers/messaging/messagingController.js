module.exports = (app) => {
  app.get("/messages", (req, res) => {
    res.render("messages");
  });

  app.get("/messages/new", (req, res) => {
    res.render("messages", { new: "new" });
  });

  app.get("/messages/:id", (req, res) => {
    if (req.params === "new") {
      res.render("messages");
    } else {
      res.render("messages", {
        id: req.params.id,
      });
    }
  });
};
