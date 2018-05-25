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
                config.sendJSONresponse(res, err);
            }
            else {
                config.sendJSONresponse(res, {
                    success: true,
                    message: 'Fav added!'
                });
            }
        });
    });

    router.get('/fav', function(req, res) {

        Favorite.find({}, (err, favs) => {
            if (err) {
                config.sendJSONresponse(res, err);
            } else {
                if (!favs) {
                    config.sendJSONresponse(res, err);
                } else {
                    config.sendJSONresponse(res, favs);
                }
            }
        }).sort({
            '_id': -1
        });
    });

    router.delete('/:id', function(req, res) {

        Favorite.deleteOne({
            _id: req.params.id
        }, (err, fav) => {
            if (!fav) {
                config.sendJSONresponse(res, err);
            } else {
                config.sendJSONresponse(res, {
                    success: true,
                    message: 'Fav deleted!'
                });
            }
        });
    });

    router.get('/user/:id', function(req, res) {
        Favorite.find({
            userId: req.params.id
        }, (err, favs) => {
            if (!favs) {
                config.sendJSONresponse(res, {
                    success: false,
                    message: 'Favs not found.'
                })
            } else {
                config.sendJSONresponse(res, favs);
            }
        });

    });
/*
    router.put('/:id', function(req, res) {
        Meetup.update({
            _id: req.params.id
        }, req.body, function(err, meetup) {
            if (err)
                return config.sendJSONresponse(res, {
                    success: false,
                    message: "There was a problem updating the user."
                });
            config.sendJSONresponse(res, meetup);
        });
    });
*/
    return router;
};