const User = require('../models/user');
const config = require('../config/config');
const passport = require('passport');
var LocalStorage = require('node-localstorage').LocalStorage;
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

        if(Object.keys(req.body).length == 0) {
            //console.log(req.body);
            if (typeof localStorage === "undefined" || localStorage === null) {
                var LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
            }    
            //localStorage.removeItem("user");
            var user1 =  JSON.parse(localStorage.getItem('user')).user;
            // if(user1.firstName == 'юлия' || user1.lastName ==='ольховик') {
            //     user1.firstName = "Yulia";
            //     user1.lastName = "Alkhovik";
            //     user1.location = "Minsk";
            // }
            var password = JSON.parse(localStorage.getItem('user')).password;
            console.log(password);
            User.findOne({ email: user1.email }, (err, user) => {
                if (!user) {
                    let user = new User (user1);
                    user.setPassword(password);
                    user.save((err) => {if(err) console.log(err)});
                    console.log(user,"uuuu");
                } else {
                       
                console.log(user);
                }
            });
            req.body = {
                email: user1.email,
                password: password
            }

        } 
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

   // router.get('/fbLogin',  passport.authenticate('facebook'));

    return router;
}