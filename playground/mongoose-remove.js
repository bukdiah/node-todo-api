const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) Removes everything from collection

/*
Todo.remove({}).then((result) => {
  console.log(result);
});*/

// Todo.findOneAndRemove removes documt from collection and returns it
// Todo.findByIdAndRemove does the same but takes an ID as arg

// ID 5ab71c39106f2fff71a4dbef
/*
Todo.findByIdAndRemove('5ab71c39106f2fff71a4dbef').then((todo) => {
  console.log(todo);
});*/