const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


// Favorite Model Definition
const favoriteSchema = new Schema({
    meetupId: { type: String, required: true },
    userId: { type: String, required: true },
    additionDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Favorite', favoriteSchema);