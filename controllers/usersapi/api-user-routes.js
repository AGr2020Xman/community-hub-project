const { checkAuthenticated } = require('../../config/middleware/checkAuth');
const { typeOfQueryData } = require('./api-user-query');
const express = require('express');
const router = express.Router();


router.get('/api/users', checkAuthenticated, async (req, res) => {
    console.log(req.query);
    if (req.query == " " || req.query === "") {
        let response = 'Please enter a term to search'
        res.json(response);
    } else {
        typeOfQueryData(req, res)
    }
});

module.exports = router;
   

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
// return //result array of search results [{firstName: X, nickname: Y},{},{}]       