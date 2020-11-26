const express = require('express');
const passport = require('../../config/passport-config');
const db = require('../../models');
const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');

const app = express();

module.exports = (app) => {

app.get('/', checkAuthenticated, async (req, res) => {
  await req.user;
  console.log("Req.USER log", req.user);
  res.render('index.handlebars', {name: req.user.nickname})
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.handlebars')
})

app.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup.handlebars')
})

app.post('/api/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}))

app.post('/api/signup', checkNotAuthenticated, async (req, res) => {
  try{
    // const protectedPsw = await bcrypt.hash(req.body.password, 10);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
    }).then(() => {
      res.status(307)
      res.redirect('/login')
    })
  } catch (err) {
    if (err) console.log('There was an error signing up user:\n');
    res.status(401).json(err)
    res.redirect('/signup')
  }
});

app.get("/api/user_data", checkAuthenticated, async (data) => {
  await data.user;
  console.log(data.user);
});

// Route for logging user out
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

};

// protected (auth needed) - unprotected routes
// route guards - ? certain routes only working when lgged in
// component guard - ? (the create button requires authenticated user)