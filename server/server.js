const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      config = require('./config/config'),
      path = require('path'),
      router = express.Router(),
      cors = require('cors'),
      jwt = require('express-jwt');

      var LocalStrategy = require('passport-local').Strategy;

      

var User = require ('./models/user'), 
FacebookStrategy = require('passport-facebook').Strategy,
TwitterStrategy = require('passport-twitter').Strategy;
var passport = require('passport');


//mongoDB
const mongoose = require('mongoose');

const authJwt = jwt({
    secret: config.secret,
    userProperty: 'user'
});

require('./config/passport');
//routers
const meetups = require('./routes/meetups')(router);
const auth = require('./routes/auth')(router);
const profiles = require('./routes/profiles')(router);
const favorites = require('./routes/favorites')(router);

var multer  = require('multer')
var DIR = './server/uploads/';

var storage = multer.diskStorage(
  {
      destination: DIR,
      filename: function ( req, file, cb ) {
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?
          cb( null, file.originalname);
      }
  }
);

var upload = multer( { storage: storage } ).single('photo');

//var upload = multer({dest: DIR}).single('photo');  

//connection to DB
mongoose.connect(config.dbUrl,  { useMongoClient: true });
mongoose.connection.once('connected', function() {
    console.log("Database connected to " + config.dbUrl);
});

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'dist')));
app.use('/static', express.static('server/uploads'));

app.use(passport.initialize());
//app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });






passport.use(new TwitterStrategy({
    consumerKey: "tZKzcapWe3XLPFolVEfRuU31u",
    consumerSecret: "XdoPqbWCuInYVMgSh4chUeb2WMXbqBNx3r13OPptl4oinKhW9j",
    callbackURL: "http://localhost:8000/auth/twitter/callback",
    profileFields: ['id', 'displayName', 'photos', 'email', 'picture.type(large)']
  },
  function(token, tokenSecret, profile, done) {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
    localStorage.removeItem("user");
    let user = {
      firstName: profile.displayName.split(' ')[0],
      lastName: profile.displayName.split(' ')[1],
      email: profile._json.email,
      location: 'Minsk',
      image: profile._json.picture
    };
    console.log(profile);
    let password = profile._json.id;
    localStorage.setItem("user", JSON.stringify({ user: user, password: password}));
    return done(null, profile);

  }
));


app.post('/avatar', function (req, res, next) {
  var path = '';
  console.log(__dirname + '/uploads')
  upload(req, res, function (err) {
     if (err) {
       // An error occurred when uploading
       console.log(err);
       return res.status(422).send("an Error occured")
     }  
     path = req.file.filename;
     return res.send("http://localhost:8000/static/"+path); 
 });	 
})

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: 'http://localhost:4200/?tw=true',
                                     failureRedirect: '/login' }));





passport.use(new FacebookStrategy({
    clientID: "376871946134522",
    clientSecret: "bac7faef6cfd5ad7d993ae9dd34f08d5",
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
      if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      localStorage.removeItem("user");
      let user = {
        firstName: profile.displayName.split(' ')[0],
        lastName: profile.displayName.split(' ')[1],
        email: profile._json.email,
        location: 'Minsk' 
      };
      console.log(profile._json);
      let password = profile._json.id;
      console.log("user.setPassword(password)");
      localStorage.setItem("user", JSON.stringify({ user: user, password: password}));
      return done(null, profile);
  }
));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: 'http://localhost:4200/login?fb=true',
                                      failureRedirect: '/login' }));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);

///app.use( express.static('./server/uploads/'));




// Use routes in application
app.use('/favorites', favorites);
app.use('/meetups', meetups);
app.use('/auth', auth);
app.use('/profile', authJwt, profiles);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(config.port, function() {
    console.log(`listening on port ${config.port}...`)
})