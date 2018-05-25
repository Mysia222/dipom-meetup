const User = require('../models/user');
const config = require('../config/config');
const passport = require('passport');

module.exports = (router) => {

    router.post('/register', function(req, res) {

        let user = new User({
            firstName: req.body.firstName.toLowerCase(),
            lastName: req.body.lastName.toLowerCase(),
            email: req.body.email.toLowerCase(),
            location: req.body.location.toLowerCase()
        });
        user.setPassword(req.body.password);

        user.save((err) => {
            var token;
            token = user.generateJwt();
            if (err) {
                config.sendJSONresponse(res, err);
            }
            // If user is saved
            config.sendJSONresponse(res, {
                success: true,
                token: token
            });
        });
    });

    router.post('/login', (req, res) => {

        passport.authenticate('local', function(err, user, info) {
            var token;
            // If Passport throws/catches an error
            if (err) {
                config.sendJSONresponse(res, err)
                return;
            }
            // If a user is found
            if (user) {
                config.sendJSONresponse(res, {
                    message: "You are welcome!",
                    token: user.generateJwt()
                })
            } else {
                // If user is not found
                config.sendJSONresponse(res,  {
                    message: "Почта или пароль введены неверно"
                })
            }
        })(req, res);
    });

    return router;
}