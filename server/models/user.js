const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const crypto = require('crypto'),
      config = require('../config/config'),
      jwt = require('jsonwebtoken');

// User Model Definition
const userSchema = new Schema({  
    firstName: { type: String, required: true, lowercase: true },    
    lastName: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    isAdmin: { type: Boolean },
    location: { type: String },
    hash: String,
    salt: String
});


userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      isAdmin: this.isAdmin,
      location: this.location,
      exp: parseInt(expiry.getTime() / 1000),
    }, config.secret);
  };

module.exports = mongoose.model('User', userSchema);