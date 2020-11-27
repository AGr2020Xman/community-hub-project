require('dotenv').config();

// Dependences
const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");
const flash = require('express-flash');
const passport = require('passport');
const messaging = require("./controllers/messaging/messagingServer");

// Express config
const PORT = process.env.PORT || 3001;
const db = require('./models');


const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Express data handler config
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// critical to sessions .env var needs to be figured out as a cookie maybe??
app.use(passport.initialize());
//to persist across session
app.use(passport.session());

// Setup Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');


// Routes
require("./controllers/loginpage/authentication")(app);
require("./controllers/mypages/myPage")(app);
require("./controllers/testController")(app);
require("./controllers/static/static")(app);
app.use(require("./controllers/messaging/messagingController"));
app.use(require("./controllers/messaging/messagingApi"));
require("./controllers/usersapi/api-user-routes")(app);

// // Listener
// Syncing our database and logging a message to the user upon success
db.sequelize
  .sync({ force: false })
  .then(() => {
    return app.listen(PORT, () => {
       console.log(
        `Geoverse main server app listening on: https://localhost:${PORT}`
      );
    });
  })
  .then((server) => {
    // Create Geoverse chat server
    messaging(server);
  });