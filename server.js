require("dotenv").config();

// Dependences
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const flash = require("express-flash");
const passport = require("passport");
const messaging = require("./controllers/messaging/messagingServer");

// Express config
const PORT = process.env.PORT || 3001;
const db = require("./models");

const app = express();

// Express data handler config
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// critical to sessions .env var needs to be figured out as a cookie maybe??
app.use(passport.initialize());
//to persist across session
app.use(passport.session());

// Setup Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "default" }));
app.set("view engine", "handlebars");

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


// // Listener
// Syncing our database and logging a message to the user upon success
db.sequelize
  .sync({ force: true })
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
