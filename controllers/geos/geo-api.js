const express = require('express');
const router = express.Router();
const db = require('../../models');


// router.get('/geos/:community', async (req, res) => {
//   const communityRef = queryResult;
//   let queryResult;
//   let results;
//   queryResult = await db.Community.findAll({
//     attributes: ['name'],
//     include: {
//       model: db.Geo,
//       attributes: ['id', 'name'],
//     },
//     raw: true,
//   });
//   results = {
//     searchResult: queryResult,
//   };
//   const hbsArr = [];
//   queryResult.forEach((el, index) => {
//     const commObj = {};
//     commObj.name = el.name;
//     commObj.GeoId = el['Geo.id'];
//     commObj.GeoName = el['Geo.name'];
//     hbsArr.push({ ...commObj });
//   });
//   db.('sites').where('geo', '==', req.params.geo);
//   sitesRef.get().then((docs) => {
//     const hbsObject = { sites: {} };
//     docs.forEach((site) => {
//       hbsObject.sites[site.id] = {
//         ...site.data(),
//       };
//     });
//     res.render('sites', hbsObject);
//   });
// });

router.get('/geos', async (req, res) => {
  let queryResult;
  let results;
  queryResult = await db.Geo.findAll({
    attributes: ['name'],
    include: {
      model: db.Community, attributes: ['id','name']
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
    commObj.CommunityId = el['Communities.id'];
    commObj.CommunityName = el['Communities.name'];
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
    include: {
      model: db.Community, attributes: ['id','name']
    },
    raw: true,
  });
  results = {
    searchResult: queryResult,
  };
  res.json(results);
});

module.exports = router;
