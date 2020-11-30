const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/geos', async (req, res) => {
  let queryResult;
  let results;
  queryResult = await db.Geo.findAll({
    attributes: ['name'],
    // include: {
    //   model: db.Community, attributes: ['id','name']
    // },
    raw: true,
  });
  results = {
    searchResult: queryResult,
  };
  const hbsArr = [];
  queryResult.forEach((el, index) => {
    const commObj = {};
    commObj.name = el.name;
    hbsArr.push({ ...commObj });
  });
  console.log(hbsArr);

  res.render('geos', { geos: hbsArr });
});

router.get('/api/geos', async (req, res) => {
  let queryResult;
  let results;
  queryResult = await db.Geo.findAll({
    attributes: ['name'],
    // include: {
    //   model: db.Community, attributes: ['id','name']
    // },
    raw: true,
  });
  results = {
    searchResult: queryResult,
  };
  res.json(results);
});

module.exports = router;
