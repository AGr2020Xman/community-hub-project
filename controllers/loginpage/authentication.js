const express = require('express');
const passport = require('../../config/passport-config');
const db = require('../../models');
const { checkAuthenticated, checkNotAuthenticated } = require('../../config/middleware/checkAuth');
const router = express.Router();

// router.get('/', checkAuthenticated, async (req, res) => {
//   await req.user;
//   res.render('index.handlebars', {name: req.user.nickname})
// });

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

router.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup');
});

router.post('/api/login', checkNotAuthenticated, passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

// router.get('/login/error', (req, res) => {
//   // console.log('ConsoleLOG: Login Error', req.);
//   res.render('login', {failure:'failure',})
// })

router.post('/api/signup', checkNotAuthenticated, async (req, res) => {
  try {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.password,
    }).then((dbUser) => {
      req.login(dbUser, () => {
        res.status(201).json(dbUser);
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/api/user_data', checkAuthenticated, async (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    const objectRef = await req.user;
    const desiredData = {
      displayName: objectRef.firstName + ' ' + objectRef.lastName,
      nickname: objectRef.nickname,
      uniqueIdentifier: objectRef.uniqueIdentifier,
    };
    return res.json(desiredData);
  }
});

// Route for logging user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
