var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require ('../models/user');

var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "376871946134522",
    clientSecret: "bac7faef6cfd5ad7d993ae9dd34f08d5",
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate( function(err, user) {
      console.log(user)
      if (err) { return done(err); }
      done(null, profile);
    });
  }
));

//310132302703073
//app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook',(req, res)=>{ 
  console.log('HERE');
  passport.authenticate('facebook')
});


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);