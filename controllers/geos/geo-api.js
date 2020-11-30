const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require('../../models');

// router.get('/api/geo', async (req, res) => {
//   db.Geo.findAll({
//     attributes: ['name']
//   })
//   .then((allGeos) => {
//     console.log(allGeos);
//     response.status(200).json(allGeos);
//   })
//   .catch((err) => {
//     response.status(401).json(err);
//   });
// });

  module.exports = router;