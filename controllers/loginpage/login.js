const express = require('express');
const passport = require('passport');
const initialisePassport = require('../../config/passport-config');
const bcrypt = require('bcrypt');

const app = express();

initialisePassport(
  passport, 
  email => db.find(user => user.email === email),
  id => db.find(user => user.id === id)
);

// middlware
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

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.handlebars', {name: req.user.name})
});

app.get('/login',checkNotAuthenticated, (req, res) => {
  res.render('login.handlebars')
})

app.get('/register',checkNotAuthenticated, (req, res) => {
  res.render('signup.handlebars')
})

app.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}))

app.post('/register',checkNotAuthenticated, async (req, res) => {
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
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
});



// protected (auth needed) - unprotected routes
// route guards - ? certain routes only working when lgged in
// component guard - ? (the create button requires authenticated user)