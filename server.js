// Dependences
require('dotenv').config();
const messaging = require('./controllers/messaging/messagingServer');

// Express config
const PORT = process.env.PORT || 3001;
const db = require('./models');

// Routes
app.use(require("./controllers/loginpage/authentication"));
require("./controllers/mypages/myPage")(app);
require("./controllers/testController")(app);
app.use(require("./controllers/static/static"));
app.use(require("./controllers/messaging/messagingController"));
app.use(require("./controllers/messaging/messagingApi"));
app.use(require("./controllers/usersapi/api-user-routes"));
app.use(require('./controllers/communities/community-api'));
app.use(require('./controllers/geos/geo-api'));

// Create app
const app = require('./src/app');

// // Listener
// Syncing our database and logging a message to the user upon success
db.sequelize
  .sync({ force: true })
  .then(() => {
    return app.listen(PORT, () => {
      console.log(`Geoverse main server app listening on: https://localhost:${PORT}`);
    });
  })
  .then((server) => {
    // Create Geoverse chat server
    messaging(server);
  });
