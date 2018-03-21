const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = "5ab29c2de2d1590f502e1166";

//var id = "5ab29c2de2d1590f502e116611";

var id = "5ab27484b27b3313482dc1d2"; // user doc

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}
/*
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

// Returns the first document that matches your criteria
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});*/

// FInd document by it's _id
/*
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('ID not found');
  }
  console.log('Todo By ID', todo);
}).catch((e) => {
  console.log('error', e);
});*/

// Query Users

// User.findbyId   this id "5ab27484b27b3313482dc1d2"

User.findById(id).then((user) => {
  if (!user) {
    return console.log('ID not found');
  }
  console.log('user By ID', user);
}).catch((e) => {
  console.log('error', e);
});