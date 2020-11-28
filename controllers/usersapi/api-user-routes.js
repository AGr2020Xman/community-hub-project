const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const db = require('../../models')


module.exports = (app) => {

    app.get('/api/users', async (req, res) => {
        // from user search in messages
        const query = req.query;
        console.log('query', query);
        console.log('Name',query.name);
        // trims off trail or lead space
        const trimmedNoSpace = (Object.values(query)[0]).trim();
        console.log(trimmedNoSpace);
        const splitLargeName = query.name.split(" ");
        // first name for querying
        const qFirstName = splitLargeName.shift();
        // for a multi stage last name - joins it back up (eg: ['Van','der','Wyck'] => Van der Wyck)
        const qLastName = splitLargeName.join(' ');

        let searchTerm = qFirstName
        const queryResult = await sequelize.query(
            "SELECT firstName + ' ' lastName AS fullName FROM users WHERE firstName LIKE :search_name",
            {
                replacements: { search_name: `${searchTerm}` },
                type: QueryTypes.SELECT
            }
            );
            console.log(queryResult);
        })
    }

        //

        // const usersObj = {
        //     firstName: searchedUser.firstName,
        //     lastname: searchedUser.lastname,
        //     nickname: searchedUser.nickname,
        //     uniqueidentifier: searchedUser.uniqueidentifier
        // }
        // array OR obj of users, for searching ALL users 
        // wants names, nickname, uuid, 
        // i want to search by either firstname or lastname or nickname
        // return back an accessible obj? or array?
        // ?firstName = X
    // })
    
// query = First Last
// myquerystring::::: var X = query.split(" ")
// x[0] = match Firstname, && x[1] = match Lastname


    

//     await sequelize.query(
//         'SELECT * FROM users WHERE id LIKE :search_name',
//         {
//             replacements: { search_name: `${searchTerm}` },
//             type: QueryTypes.SELECT
//         }
//         );
//         const searchTerm = $('.search').val();

//     await sequelize.query(
//         'SELECT * FROM users WHERE nickname LIKE :search_name',
//         {
//             replacements: { search_name: `${searchTerm}` },
//             type: QueryTypes.SELECT
//         }
//         );
        
// // name = first/lastname
// // id = uniqueIdentifier
// // nickname = nickname

//     // if i search uniqueidentifier - return OBJ -minus psw
//     app.get('/api/users', checkAuthenticated, async (req, res) => {
//         const idSearch = await req.user;
//         const identity = {
//             uniqueidentifier: idSearch.uniqueidentifier
//         }
//     })
        
return //result array of search results [{firstName: X, nickname: Y},{},{}]
    

// }