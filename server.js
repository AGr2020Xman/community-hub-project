if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
};

// Dependences
const express = require("express");

const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const db = require('./models');
const sequelize = require('sequelize');

const messaging = require("./controllers/messaging/messagingServer");


// Express config
const app = express();
const PORT = process.env.PORT || 7001;

// Setup Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view-engine', 'handlebars');

// Express data handler config
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// critical to sessions .env var needs to be figured out as a cookie maybe??
app.use(passport.initialize());
//to persist across session 
app.use(passport.session());


// Routes

require("./controllers/loginpage/authentication")(app);
require("./controllers/mypages/myPage")(app);

// db.sequelize.sync({ alter: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Geoverse main server app listening on: ${PORT}`);
//   })
// });
// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(`Geoverse main server app listening on: ${PORT}`);
  });
});

// require("./controllers/mypages/myPage")(app);
require("./controllers/testController")(app);
require("./controllers/static/static")(app);

// Listener
const server = app.listen(PORT, () => {
  console.log(`Geoverse main server app listening on: ${PORT}`);
});

// Create Geoverse chat server
messaging(server);

