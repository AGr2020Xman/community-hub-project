const express = require('express');

const db = require('../../models');

const router = express.Router();

router.get('/communities', async (req, res) => {
  let queryResult;
  let results;
  queryResult = await db.Community.findAll({
    attributes: ['name'],
    include: {
      model: db.Geo,
      attributes: ['id', 'name'],
    },
    raw: true,
  });
  results = {
    searchResult: queryResult,
  };
  const hbsArr = [];
  queryResult.forEach((el, index) => {
    const commObj = {};
    commObj.name = el.name;
    commObj.GeoId = el['Geo.id'];
    commObj.GeoName = el['Geo.name'];
    hbsArr.push({ ...commObj });
  });
  console.log(hbsArr);

  res.render('communities', { communities: hbsArr });
});

router.get('/api/communities', async (req, res) => {
  let queryResult;
  let results;
  queryResult = await db.Community.findAll({
    attributes: ['name'],
    include: {
      model: db.Geo,
      attributes: ['id', 'name'],
    },
    raw: true,
  });
  results = {
    searchResult: queryResult,
  };
  res.json(results);
});

module.exports = router;
