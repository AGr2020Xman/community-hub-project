module.exports = (app) => {
  // Get route for index page
  app.get("/", (req, res) => {
    console.log("In static");
    res.render("index", { layout: "main" });
  });
};
