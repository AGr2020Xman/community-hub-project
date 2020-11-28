module.exports = (app) => {
  // Get route for index page
  app.get("/", (req, res) => {
    res.render("index", { layout: "main" });
  });
};
