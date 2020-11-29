const db = require('../../models');
const { QueryTypes, Op, Sequelize} = require('sequelize');

const caseType = (query) => {
    if ('community' in query) {
        return 0;
    } else if ('geo' in query) {
        return 1;
    };
};

// i need to 
// PING to communities DB for the Community name - and put them in card names

const geoOrCommunity = async (req, res) => {
    const query = req.query;
    let queryResult;
    let results;
    const trimSearch = (Object.values(query)[0]).trim();
    const searchTerm = trimSearch

    switch (caseType(query)) {
        case 0:
            queryResult = await db.Community.findAll({
                attributes: ['name'],
                where: {
                    [Op.substring]: [`${searchTerm}`]
                },
                raw: true
            })
            results = {
                searchResult: queryResult
            }
            res.json(results)
            break;
        case 1:
            queryResult = await db.Geo.findAll({
                attributes: ['name'],
                where: {
                        [Op.like]: [`%${searchTerm}%`]   
                },
                raw: true
            })
            results = {
                searchResult: queryResult
            }
            res.json(results)
            break;
        }
}
module.exports = { geoOrCommunity };