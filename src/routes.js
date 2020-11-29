// Import routes
const auth = require('../controllers/loginpage/authentication');
const myPage = require('../controllers/mypages/myPage');
const testSite = require('../controllers/testController');
const home = require('../controllers/home/home');
const users = require('../controllers/usersapi/api-user-routes');
const community = require('../controllers/communities/community-api');
const geo = require('../controllers/geos/geo-api');
const userProf = require('../controllers/userprofilehtml/userProfileRoutes');
const messagingController = require('../controllers/messaging/messagingController');
const liveWall = require('../controllers/messaging/messagingApi');


module.exports = { auth, myPage, testSite, home, users, community, geo, userProf, messagingController, liveWall };
