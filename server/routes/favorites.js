const Favorite = require('../models/fav');
const config = require('../config/config');

module.exports = (router) => {

    router.post('/addfav', function(req, res) {
        const fav = new Favorite({
            meetupId: req.body.meetupId,
            userId: req.body.userId,
            additionDate: req.body.additionDate,
        });
        console.log(fav);

        fav.save((err) => {
            if (err) {
                config.sendJSONresponse(res, 500, err);
            }
            else {
                config.sendJSONresponse(res, 200, {
                    success: true,
                    message: 'Fav added!'
                });
            }
        });
    });

    router.get('/fav', function(req, res) {

        Favorite.find({}, (err, favs) => {
            if (err) {
                config.sendJSONresponse(res, 500, err);
            } else {
                if (!favs) {
                    config.sendJSONresponse(res, 401, err);
                } else {
                    config.sendJSONresponse(res, 200, favs);
                }
            }
        }).sort({
            '_id': -1
        });
    });


/*

    router.delete('/:id', function(req, res) {

        Meetup.deleteOne({
            _id: req.params.id
        }, (err, meetup) => {

            if (!meetup) {
                config.sendJSONresponse(res, 401, err);
            } else {
                config.sendJSONresponse(res, 200, {
                    success: true,
                    message: 'Meetup deleted!'
                });
            }
        });
    });
*/
    router.get('/user/:id', function(req, res) {
        Favorite.find({
            userId: req.params.id
        }, (err, favs) => {
            if (!favs) {
                config.sendJSONresponse(res, 401, {
                    success: false,
                    message: 'Favs not found.'
                })
            } else {
                config.sendJSONresponse(res, 200, favs);
            }
        });

    });
/*
    router.put('/:id', function(req, res) {
        Meetup.update({
            _id: req.params.id
        }, req.body, function(err, meetup) {
            if (err)
                return config.sendJSONresponse(res, 500, {
                    success: false,
                    message: "There was a problem updating the user."
                });
            config.sendJSONresponse(res, 200, meetup);
        });
    });
*/
    return router;
};