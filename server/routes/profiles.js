const User = require('../models/user');
const config = require('../config/config');
var jwt = require('express-jwt');

var auth = jwt({
  secret: config.secret,
  userProperty: 'user'
});

module.exports = (router) => {
    
    router.get('/:id', auth, (req, res) => {

       if (!req.params.id) {
            config.sendJSONresponse(res, 401, { message : "UnauthorizedError: private profile"});
          } else {

              User.findOne({ _id: req.params.id }, (err, user) => {
                if (!user) {
                  config.sendJSONresponse(res, 401, { success: false, message: 'user not found.' });
                } else {
                  config.sendJSONresponse(res, 200, user);
                }
            });
          }

    });

    
    router.get('/', auth, function(req, res) {

      User.find({}, (err, users) => {
          if (err) {
              config.sendJSONresponse(res, 404, err);
          } else {

              if (!users) {
                  config.sendJSONresponse(res, 401, err);
              } else {
                  config.sendJSONresponse(res, 200, users);
              }
          }
      }).sort({ 
          '_id': -1
      });
  });

    

    return router;
}