// Mongoose ORM
var mongoose = require('mongoose');

// Mongoose supports promises by default but we're gonna use Promises

//Use default promise as opposed to 3rd party
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

// Make mongoose variable available to everyone
module.exports = {
  mongoose: mongoose
};