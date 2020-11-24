const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express().Router;

const initialisePassport = require('../../config/passport-config');

initialisePassport(
  passport, 
  email => db.find(user => user.email === email),
  id => db.find(user => user.id === id)
);

// middleware
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return res.redirect('/');
  }
  next();
}

router.get('/', checkAuthenticated, (req, res) => {
  console.log("Req.USER log", req.user);
  res.render('index.handlebars', {name: req.user.name})
});

router.get('/login',checkNotAuthenticated, (req, res) => {
  res.render('login.handlebars')
})

router.get('/register',checkNotAuthenticated, (req, res) => {
  res.render('signup.handlebars')
})

router.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}))

router.post('/register',checkNotAuthenticated, async (req, res) => {
  try{
      const protectedPsw = await bcrypt.hash(req.body.password, 10);
      tempDB.push({
          id: Date.now().toString(),
          name: req.body.firstName + " " + req.body.lastName,
          email: req.body.email,
          username: req.body.username,
          password: protectedPsw,
      })
      res.redirect('/login')
  } catch (err) {
    if (err) console.log('There was an error registering user:\n', err);
    res.redirect('/signup')
  }
});

// logout function
router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});

module.exports = router
// protected (auth needed) - unprotected routes
// route guards - ? certain routes only working when lgged in
// component guard - ? (the create button requires authenticated user)