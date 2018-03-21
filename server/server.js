// Mongoose ORM
var mongoose = require('mongoose');

// Mongoose supports promises by default but we're gonna use Promises

//Use default promise as opposed to 3rd party
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create a model and specify attributes we want it to have
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

/*
var newTodo = new Todo({
  text: 'Cook dinner'
});

// save newTodo to MongoDB
newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});*/

var newTodo = new Todo({
  text: 'Poop',
  completed: true,
  completedAt: 100
});

// save newTodo to MongoDB
newTodo.save().then((doc) => {
  console.log('Saved todo', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo');
});