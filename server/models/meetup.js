const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


// Meetup Model Definition
const meetupSchema = new Schema({
    meetupData: {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        price: {type: Number, required: true  },
        eventsDate: { type: Date, default: Date.now() },
        address: { type: String },
        category: { type: String }, 
        rating:  {type: Number }
    },
    createdBy:  { type: String, required: true }, 
    participants: [{
        username: { type: Number, default: 0 }
    }],
    comments: [{
        commentsRating: { type: Number, default: 0 },
        commentsTitle: { type: String },
        commentsDescription: { type: String }
    }],
    createUser: { type: String }
});


module.exports = mongoose.model('Meetup', meetupSchema);


// {
//     "title": "Rolling scopes",
//     description: "Найс",
//     image: "http://www.park.by/_img/18922153_435585863493811_3948870067231875614_n.jpg",
//     price: 0,
//     eventsDate: 1520687728870,
//     address: "Pvt",
//     createdBy:  "",
//     category: "Tech"  
// }