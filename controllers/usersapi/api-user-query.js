const db = require('../../models');
const { QueryTypes, Op, Sequelize} = require('sequelize');

const caseType = (query) => {
    if ('name' in query) {
        return 0;
    } else if ('partial' in query) {
        return 1;
    } else if ('id' in query) {
        return 2
    } else if ('nickname' in query) {
        return 3
    } else {
        return 4;
    }
};

const typeOfQueryData = async (req, res) => {
    const query = req.query;
    let queryResult;
    let results;
    const trimSearch = (Object.values(query)[0]).trim();
    const searchTerm = trimSearch
    console.log('inside this function');
    console.log(caseType(query));
    switch (caseType(query)) {
        case 0:
            queryResult = await db.User.findAll({
                attributes: ['fullName'],
                where: {
                    fullName: {
                        [Op.like]: [`%${searchTerm}`]
                    }
                },
                raw: true
            })
            results = {
                searchResult: queryResult
            }
            res.json(results)
            break;
            default: 
            return;
        }
    //     case "partial" in query:

    //         // trims off trail or lead space
    //         // splits out a large name
    //         // const splitLargeName = query.name.split(" ");
    //         // first name for querying
    //         // const qFirstName = splitLargeName.shift();
    //         // for a multi stage last name - joins it back up (eg: ['Van','der','Wyck'] => Van der Wyck)
    //         // const qLastName = splitLargeName.join(' ');
    //         // queryResult = await db.User.findAll({
    //         //     attributes: ['firstName', 'lastName'],
    //         //     where: {
    //         //         [Op.or]: [{ 
    //         //             firstName: `${searchTerm}`
    //         //         }, 
    //         //         {
    //         //             lastName: `${searchTerm}`
    //         //         }]
    //         //     }
    //         //     });
    //         //     results = {
    //         //         searchResult: queryResult
    //         //     }
    //         //     res.json(results);
    //         break;
    //     case "id" in query:
    //         break;
    //     case "nickname":
    //         break;
        // default: 
        //     break;
        // }
    //     // queryResult = await db.User.findAll({
    //     //     attributes: ['firstName', 'lastName'],
    //     //     where: {
    //     //         [Op.substring]: `${searchTerm}`
    //     //     }
    //     //     });
    //     //     results = {
    //     //         searchResult: queryResult
    //     //     }
    //     //     res.json(results);
    //         break;
    // }
}

module.exports = { typeOfQueryData }