const Meetup = require('../models/meetup');
const config = require('../config/config');
const User = require('../models/user');

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
            createdBy: req.body.createdBy,
            createUser: req.body.createUser
        });

        meetup.save((err) => {
            if (err) {
                config.sendJSONresponse(res, err);
            } else {
                config.sendJSONresponse(res, {
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
                config.sendJSONresponse(res, {
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
                        return config.sendJSONresponse(res, {
                            success: false,
                            message: "There was a problem updating the meetup."
                        });
                    config.sendJSONresponse(res, meetup);
                });
            }
        });
    });

    router.get('/allcomments/:id', function(req, res) {

        Meetup.findOne({
            _id: req.params.id
        }, (err, meetup) => {
            if (!meetup) {
                config.sendJSONresponse(res, {
                    success: false,
                    message: 'meetup not found.'
                })
            } else {
                // console.log(meetup.comments);
                config.sendJSONresponse(res, meetup.comments);
            }
        });

    });

    router.get('/comments/:id', function(req, res) {
        Meetup.findOne({
            _id: req.params.id
        }, (err, meetup) => {
            if (!meetup) {
                config.sendJSONresponse(res, {
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
                        return config.sendJSONresponse(res, {
                            success: false,
                            message: "There was a problem updating the meetup."
                        });
                    config.sendJSONresponse(res, meetup);
                });
            }
        });
    });

    router.get('/', function(req, res) {
        Meetup.find({}, (err, meetups) => {
            if (err) {
                config.sendJSONresponse(res, err);
            } else {

                if (!meetups) {
                    config.sendJSONresponse(res, err);
                } else {
                    config.sendJSONresponse(res, meetups);
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
                config.sendJSONresponse(res, err);
            } else {
                config.sendJSONresponse(res, {
                    success: true,
                    message: 'meetup deleted!'
                });
            }
        });
    });
    router.put('/edit/:id', function(req, res) {
        User.update({
            _id: req.params.id
        }, req.body, function(err, user) {
            console.log(user);
            if (err){
                console.log(err);
                return config.sendJSONresponse(res, {
                    success: false,
                    message: "There was a problem updating the user."
                });
            }
            config.sendJSONresponse(res, user);
        });
    });
    router.get('/:id', function(req, res) {

        Meetup.findOne({
            _id: req.params.id
        }, (err, meetup) => {

            if (!meetup) {
                config.sendJSONresponse(res, {
                    success: false,
                    message: 'meetup not found.'
                })
            } else {
                config.sendJSONresponse(res, meetup);
            }
        });

    });

    router.put('/:id', function(req, res) {
        Meetup.update({
            _id: req.params.id
        }, req.body, function(err, meetup) {
            if (err)
                return config.sendJSONresponse(res, {
                    success: false,
                    message: "There was a problem updating the meetup."
                });
            config.sendJSONresponse(res, meetup);
        });
    });


    router.get('/allusers/admin', function(req, res) {
        User.find({}, (err, meetups) => {
            if (err) {
                config.sendJSONresponse(res, err);
            } else {
    
                if (!meetups) {
                    config.sendJSONresponse(res, err);
                } else {
                    config.sendJSONresponse(res, meetups);
                }
            }
        }).sort({
            '_id': -1
        });
    });

    return router;
};