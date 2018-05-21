const Meetup = require('../models/meetup');
const config = require('../config/config');

module.exports = (router) => {

    router.post('/', function(req, res) {
console.log(req.body);
        const meetup = new Meetup({
            meetupData: {
                name: req.body.meetupData.name,
                description: req.body.meetupData.description,
                image: req.body.meetupData.image,
                price: req.body.meetupData.price,
                eventsDate: req.body.meetupData.eventsDate,
                address: req.body.meetupData.address,
                category: req.body.meetupData.category,
                rating: 0
            },
            createdBy: req.body.createdBy
        });

        meetup.save((err) => {
            if (err) {
                config.sendJSONresponse(res, 400, err);
            } else {
                config.sendJSONresponse(res, 200, {
                    success: true,
                    message: 'Meetup added!'
                });
            }
        });
    });

    router.put('/comments/:id', function(req, res) {
        console.log(req.params.id);
        Meetup.findOne({
            _id: req.params.id
        }, (err, meetup) => {
            if (!meetup) {
                config.sendJSONresponse(res, 401, {
                    success: false,
                    message: 'meetup not found.'
                })
            } else {
                meetup.comments.push({
                    commentsRating: req.body.commentsRating,
                    commentsTitle: req.body.commentsTitle,
                    commentsDescription: req.body.commentsDescription
                });
                Meetup.update({
                    _id: meetup._id
                }, meetup, function(err, meetup) {
                    console.log(meetup);
                    if (err)
                        return config.sendJSONresponse(res, 500, {
                            success: false,
                            message: "There was a problem updating the meetup."
                        });
                    config.sendJSONresponse(res, 200, meetup);
                });
            }
        });
    });

    router.get('/allcomments/:id', function(req, res) {

        Meetup.findOne({
            _id: req.params.id
        }, (err, meetup) => {
            if (!meetup) {
                config.sendJSONresponse(res, 401, {
                    success: false,
                    message: 'meetup not found.'
                })
            } else {
                // console.log(meetup.comments);
                config.sendJSONresponse(res, 200, meetup.comments);
            }
        });

    });

    router.get('/comments/:id', function(req, res) {
        Meetup.findOne({
            _id: req.params.id
        }, (err, meetup) => {
            if (!meetup) {
                config.sendJSONresponse(res, 401, {
                    success: false,
                    message: 'Meetup not found.'
                })
            } else {
                meetup.comments.push({
                    commentsRating: req.body.commentsRating,
                    commentsTitle: req.body.commentsTitle,
                    commentsDescription: req.body.commentsDescription
                });
                Meetup.update({
                    _id: meetup._id
                }, meetup, function(err, meetup) {
                    if (err)
                        return config.sendJSONresponse(res, 500, {
                            success: false,
                            message: "There was a problem updating the meetup."
                        });
                    config.sendJSONresponse(res, 200, meetup);
                });
            }
        });
    });

    router.get('/', function(req, res) {
        Meetup.find({}, (err, meetups) => {
            if (err) {
                config.sendJSONresponse(res, 500, err);
            } else {

                if (!meetups) {
                    config.sendJSONresponse(res, 401, err);
                } else {
                    config.sendJSONresponse(res, 200, meetups);
                }
            }
        }).sort({
            '_id': -1
        });
    });


    router.delete('/:id', function(req, res) {

        Meetup.deleteOne({
            _id: req.params.id
        }, (err, meetup) => {

            if (!meetup) {
                config.sendJSONresponse(res, 401, err);
            } else {
                config.sendJSONresponse(res, 200, {
                    success: true,
                    message: 'meetup deleted!'
                });
            }
        });
    });

    router.get('/:id', function(req, res) {

        Meetup.findOne({
            _id: req.params.id
        }, (err, meetup) => {

            if (!meetup) {
                config.sendJSONresponse(res, 401, {
                    success: false,
                    message: 'meetup not found.'
                })
            } else {
                config.sendJSONresponse(res, 200, meetup);
            }
        });

    });

    router.put('/:id', function(req, res) {
        Meetup.update({
            _id: req.params.id
        }, req.body, function(err, meetup) {
            if (err)
                return config.sendJSONresponse(res, 500, {
                    success: false,
                    message: "There was a problem updating the meetup."
                });
            config.sendJSONresponse(res, 200, meetup);
        });
    });

    return router;
};