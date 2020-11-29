// Dependencies
const express = require('express');

const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const passport = require('passport');
const routes = require('./routes');

// Express data handler config
app.use(express.static('public'));
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
// to persist across session
app.use(passport.session());

// Setup Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'default' }));
app.set('view engine', 'handlebars');

// Setup routes
app.use(routes.auth);
routes.myPage(app);
routes.testSite(app);
app.use(routes.community);
app.use(routes.geo);
app.use(routes.home);
app.use(routes.messagingController);
app.use(routes.liveWall);
app.use(routes.users);


module.exports = app;
