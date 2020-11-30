const express = require('express');

const db = require('../../models');

const router = express.Router();

// router.post('/api/community', async (req, res) => {
//   try {
//     const community = { name: req.body.name };
//     db.Community.create(geo).then(() => {
//       res.status(307);
//       res.json(community)
//       // res.redirect("/community");
//     });
//   } catch (err) {
//     if (err) console.log(`There was an error adding the community:\n ${err}`);
//     res.status(401).json(err);
//     //   res.redirect("/");
//   }
// });

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
