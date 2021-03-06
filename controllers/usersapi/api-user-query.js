const db = require('../../models');
const { QueryTypes, Op, Sequelize } = require('sequelize');

const caseType = (query) => {
  if ('name' in query) {
    return 0;
  }
  if ('partial' in query) {
    return 1;
  }
  if ('id' in query) {
    return 2;
  }
  if ('nickname' in query) {
    return 3;
  }
};

const typeOfQueryData = async (req, res) => {
  const query = req.query;
  let queryResult;
  let results;

  if (typeof Object.values(query)[0] !== 'undefined') {
    let trimSearch = Object.values(query)[0].trim();
    return trimSearch;
  }

  const searchTerm = trimSearch;
  switch (caseType(query)) {
    case 0:
      queryResult = await db.User.findAll({
        attributes: ['fullName'],
        where: {
          fullName: {
            [Op.like]: [`%${searchTerm}%`],
          },
        },
        raw: true,
      });
      results = {
        searchResult: queryResult,
      };
      res.json(results);
      break;
    case 1:
      queryResult = await db.User.findAll({
        attributes: ['fullName'],
        where: {
          fullName: {
            [Op.substring]: [`${searchTerm}`],
          },
        },
        raw: true,
      });
      results = {
        searchResult: queryResult,
      };
      res.json(results);
      break;
    case 2:
      queryResult = await db.User.findAll({
        attributes: ['uniqueIdentifier'],
        where: {
          uniqueIdentifier: [`${searchTerm}`],
        },
        raw: true,
      });
      results = {
        searchResult: queryResult,
      };
      res.json(results);
      break;
    case 3:
      queryResult = await db.User.findAll({
        attributes: ['nickname'],
        where: {
          nickname: {
            [Op.substring]: [`${searchTerm}`],
          },
        },
        raw: true,
      });
      results = {
        searchResult: queryResult,
      };
      res.json(results);
      break;
    default:
      return 'No query made!';
  }
};
module.exports = { typeOfQueryData };
