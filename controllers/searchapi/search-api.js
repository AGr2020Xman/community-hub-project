const db = require('../../models');
const { Op } = require('sequelize');

const caseType = (query) => {
  if ('community' in query) {
    return 0;
  } else if ('geo' in query) {
    return 1;
  }
};

// i need to
// PING to communities DB for the Community name - and put them in card names

const geoOrCommunity = async (req, res) => {
  const query = req.query;
  let queryResult;
  let results;
  const trimSearch = Object.values(query)[0].trim();
  const searchTerm = trimSearch;

  // eslint-disable-next-line default-case
  switch (caseType(query)) {
    case 0:
      queryResult = await db.Community.findAll({
        where: {
          [Op.substring]: [`${searchTerm}`],
        },
        attributes: ['name'],
        raw: true,
      });
      results = {
        searchResult: queryResult,
      };
      res.json(results);
      break;
    case 1:
      queryResult = await db.Geo.findAll({
        attributes: ['name'],
        where: {
          [Op.like]: [`%${searchTerm}%`],
        },
        raw: true,
      });
      results = {
        searchResult: queryResult,
      };
      res.json(results);
      break;
  }
};
module.exports = { geoOrCommunity };
