if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
};
// Dependences
const express = require("express");
const session = require('express-sessions');
const passport = require('passport');
const flash = require('express-flash');
const db = require('./models');

// Express config
const app = express();
const PORT = process.env.PORT || 7001;

// Express data handler config
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash())

// Setup Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view-engine', exphbs);

// critical to sessions .env var needs to be figured out as a cookie maybe??
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
//to persist across session 
app.use(passport.session());

// Routes
require("./controllers/mypages/myPage")(app);
require("./controllers/loginpage/login")(app);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
  console.log(`Geoverse main server app listening on: ${PORT}`);
})
});
