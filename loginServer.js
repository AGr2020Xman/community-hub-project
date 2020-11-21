if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};

const express = require('express');
const session = require('express-sessions');
const exphbs = require('express-handlebars');
const passport = require('passport');
const flash = require('express-flash');

const app = express();
const db = require('./models');
const PORT = process.env.PORT || 7001;

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Static directory
app.use(express.static('public'));

app.set('view-engine', exphbs);
app.use(flash())

// critical to sessions .env var needs to be figured out as a cookie maybe??
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
//to persist across session 
app.use(passport.session());

await db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
