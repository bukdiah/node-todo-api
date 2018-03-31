const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// stores scheme for User
// can add custom methods here
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// overriding toJSON
UserSchema.methods.toJSON = function () {
  var user = this;
  /*
  Takes mongoose variable and converts it to a regular object
  where only the properties available on the document exist
  */
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};
// creating instance methods for UserSchema
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access: access, token: token}]);

  // we return the value of the Promise; in our case, the token
  return user.save().then(()=>{
    return token;
  });

};

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}