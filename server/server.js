var express = require('express');

// Parses HTML body into JSON Object
var bodyParser = require('body-parser');

// ES6 destructuring
// Importing our custom made mongoose, todo, and user libraries
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var {ObjectID} = require('mongodb');
// Server.js is now only responsible for our routes

var app = express();

// Configure the Middleware
// can now send JSON to our express app
app.use(bodyParser.json());

// CRUD = Create Retrieve Update Delete

// Use POST to CREATE a new Todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e); // send HTTP 400 status if error
  });
});

// GET to RETRIEVE todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos: todos
    })
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/1234567  get specific todo
// Replaces :id with the parameter passed into the URL
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  
  // Validate id
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send({});
  } else {
    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send({});
      } 
      res.send({todo: todo});
    }, (e)=> {
      res.status(400).send({});
    });
  }
  //res.send(req.params);
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};



// create a model and specify attributes we want it to have
/*
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});*/

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

/*
var otherTodo = new Todo({
  text: 'Learn a language'
});

// save newTodo to MongoDB
otherTodo.save().then((doc) => {
  console.log('Saved todo', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo');
});*/

// User Model
// email - require it - trim it - type is string - set minlength of 1

/*
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
});

var newUser = new User({
  email: "poopcity@gmail.com"
});

newUser.save().then((doc) => {
  console.log('Saved user', JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo', e);
});*/