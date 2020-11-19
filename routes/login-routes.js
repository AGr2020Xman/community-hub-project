const express = require('express');
const passport = require('passport')
const LocalStrategy = require('passport-local');

const app = express();

app.post('/login', passport.authenticate(
    'local', 
    { 
        successRedirect: '/' ,
        failureRedirect: '/login',
        failureFlash: 'Invalid username or password'
    })
);

// if login successful?
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/profiles/' + req.user.username);
});


// protected (auth needed) - unprotected routes
// route guards - ? certain routes only working when lgged in
// component guard - ? (the create button requires authenticated user)
