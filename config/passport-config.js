const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models')

passport.use(new LocalStrategy(
    { 
        usernameField: 'email' 
    }, 
    async function authenticateUser (email, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(async (user) => {
            console.log('dbUSER here', user);
            console.log();
            if (!user) {
                return done(null, false, { message: 'No user with that email registered.' });
            }
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Incorrect password'})
                }
            } catch (err) {
                return done(err) 
            }
        });
    })
    );
    
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
            return done(null, db.User.findOne({
                where: {
                    id: id
                }
            }))
        });

module.exports = passport