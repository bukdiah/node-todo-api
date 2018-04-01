require('./config/config');

const _ = require('lodash');

const express = require('express');

// Parses HTML body into JSON Object
const bodyParser = require('body-parser');

// ES6 destructuring
// Importing our custom made mongoose, todo, and user libraries
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

const {ObjectID} = require('mongodb');
// Server.js is now only responsible for our routes

var app = express();
const port = process.env.PORT;

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
    }).catch((e) => {
      return res.status(400).send();
    })
  }
});

// DELETE ROUTE "5ab71c5a106f2fff71a4dbf0"
app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;
  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
    return res.status(404).send();
  } 
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo: todo});
  }).catch((e) => {
    return res.status(400).send();
  });
});

// UPDATE Route using HTTP PATCH method (updating resources)
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    console.log('ID is invalid')
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users CREATE new users
app.post('/users', (req, res) => {

  var body = _.pick(req.body, ['email', 'password']);
  
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    // x-auth is a custom header
    res.header('x-auth', token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

// Private Route
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log('Started on port '+port);
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