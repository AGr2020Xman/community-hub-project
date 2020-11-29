// Dependences
require('dotenv').config();
const messaging = require('./controllers/messaging/messagingServer');

// Express config
const PORT = process.env.PORT || 3001;
const db = require('./models');

// Create app
const app = require('./src/app');

// // Listener
// Syncing our database and logging a message to the user upon success
db.sequelize
  .sync({ force: true })
  .then(() => {
    return app.listen(PORT, () => {
      console.log(`Geoverse main server app listening on: http://localhost:${PORT}`);
    });
  })
  .then((server) => {
    // Create Geoverse chat server
    messaging(server);
  });
