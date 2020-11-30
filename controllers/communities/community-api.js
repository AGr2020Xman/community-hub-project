const express = require("express");

const db = require('../../models');

const router = express.Router();

router.get('/communities', (req, res) => {
  res.render('communities');
});

router.get('/api/communities', async (req, res) => {
    let queryResult;
    let results;
    queryResult = await db.Community.findAll({
    attributes: ['name'],
    include: {
      model: db.Geo, attributes: ['id','name']
    },
    raw: true,
  });
  results = {
    searchResult: queryResult,
  };
  res.json(results);
});

module.exports = router;
