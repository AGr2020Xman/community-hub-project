module.exports = (app) => {
  app.get("/messages", (req, res) => {
    res.render("messages");
  });

  app.get("/messages/:id", (req, res) => {
    if (req.params.id === "new") {
      res.render("messages", { new: "new" });
    } else {
      res.render("messages", {
        id: req.params.id,
      });
    }
  });
};
