const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      config = require('./config/config'),
      path = require('path'),
      router = express.Router(),
      cors = require('cors'),
      jwt = require('express-jwt');

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

//connection to DB
mongoose.connect(config.dbUrl,  { useMongoClient: true });
mongoose.connection.once('connected', function() {
    console.log("Database connected to " + config.dbUrl);
});

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

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