const express = require("express");
const passport = require("../../config/passport-config");
const db = require("../../models");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../../config/middleware/checkAuth");

const app = express();

module.exports = (app) => {
// app.get('/', checkAuthenticated, async (req, res) => {
//   await req.user;
//   res.render('index.handlebars', {name: req.user.nickname})
// });

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.handlebars");
});


  app.get("/signup", checkNotAuthenticated, (req, res) => {
    res.render("signup.handlebars");
  });
  
app.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup.handlebars')
})

app.post('/api/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login/error',
}))

app.get('/login/error', (req, res) => {
  // console.log('ConsoleLOG: Login Error', req.);
  res.render('login', {failure:'failure',})
})

app.post("/api/signup", checkNotAuthenticated, async (req, res) => {
    try {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
      }).then(() => {
        res.status(307);
        res.redirect("/login");
      });
    } catch (err) {
      if (err) console.log("There was an error signing up user:\n");
      res.status(401).json(err);
      res.redirect("/signup");
    }
  });

  app.get("/api/user_data", checkAuthenticated, async (req, res) => {
    const objectRef = await req.user;
    const desiredData = {
      displayName: objectRef.firstName + " " + objectRef.lastName,
      nickname: objectRef.nickname,
      uniqueIdentifier: objectRef.uniqueIdentifier,
    };
    return res.json(desiredData);
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};