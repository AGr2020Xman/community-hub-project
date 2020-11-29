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
  }).then(async () => {

    const User = db.User;
    const Geo = db.Geo;
    const Community = db.Community;

await Geo.create({
    name: 'London',
  })
    .then((newGeo) => {
      console.log(newGeo.get());
    })
    .catch((err) => {
      console.log('Error while creating Geo : ', err);
    });

await Community.bulkCreate([
    { name: 'Pets' },
    { name: 'Technology' },
    { name: 'Cars' },
    { name: 'Bikes' },
    { name: 'Travel' },
    { name: 'Dance' },
    { name: 'Singing' },
    { name: 'Finance' },
    { name: 'Pets' },
  ])
    .then((newCommunities) => {
      console.log(newCommunities);
    })
    .catch((err) => {
      console.log('Error while creating Communities : ', err);
    });

await Community.findOne({
    where: { name: 'Cars' }, include: 'geo'
}).then((foundResult) => {
    console.log(foundResult);
}).catch((err) => {
    console.log('Error while find community : ', err);
})

await Geo.findByPk(1, { include: ['communities'] }).then((geo) => {
    console.log(geo);
}).catch((err)=>{
    console.log('Error while finding geo : ', err);
})


  })

