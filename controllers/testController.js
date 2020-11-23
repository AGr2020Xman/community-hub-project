module.exports = (app) => {
  app.get("/testcommunity", (req, res) => {
    res.render("community", req.params);
  });
};
