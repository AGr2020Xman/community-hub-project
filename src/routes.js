// Import routes
const auth = require('../controllers/loginpage/authentication');
const myPage = require('../controllers/mypages/myPage');
const testSite = require('../controllers/testController');
const home = require('../controllers/home/home');
const users = require('../controllers/usersapi/api-user-routes');

const messagingController = require('../controllers/messaging/messagingController');
const liveWall = require('../controllers/messaging/messagingApi');

module.exports = { auth, myPage, testSite, home, users, messagingController, liveWall };
