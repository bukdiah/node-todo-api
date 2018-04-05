const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// Model methods
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded; //stores decoded jwt values

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return a Promise that rejects
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token, // Querying a nested document
    'tokens.access': 'auth'
  });

};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({
    email
  }).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }
        else {
          reject();
        }
      });
    });
  });
};

// run some code before a specified event SAVE
UserSchema.pre('save', function (next) {
  var user = this;

  // check if pass was modified
 if (user.isModified('password')) {
   // hash the password
   bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      console.log(hash);
      user.password = hash;
      next(); //complete the middleware with next() call
    });
  });

 } else {
   next();
 }
});
var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}