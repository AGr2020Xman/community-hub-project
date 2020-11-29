module.exports = (app) => {
  app.get('/testcommunity', (req, res) => {
    res.render('testCommunity', req.params);
  });
};
