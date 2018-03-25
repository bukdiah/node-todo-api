const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const {ObjectID} = require('mongodb');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

// runs some test code before every single test case
beforeEach((done) => {
  // empties DB before every request so our tests can pass
  Todo.remove({}).then(()=>{
    Todo.insertMany(todos);
  }).then(() => done())
});

// Using Describe to group routes

describe('POST /todos', () => {
  // we have done flag because this is an ASYNC call
  it('should create a new todo', (done) => {
    var text = 'Test1';
  
    request(app)
    .post('/todos')
    .send({text: text})
    .expect(200) // expecting a HTTP 200 response
    .expect((res) => {
      /*
        We expect the response body being sent to be equal
        to text
      */
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      // fetch all documents from Todo collection
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      });
    })
  });

  it('should not create todo with invalid body data', (done) => {

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        //expect(todos[0].text).toBe(2);
        done();
      }).catch((e) => {
        done(e);
      })
    })
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)        
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    // /todos/123

    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200) // this ID exists in DB, so we should get 200
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // query DB using findById and toNotExist assertion
        Todo.findById(hexId).then((todo) => {
          console.log('todo value = ', todo)
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    // /todos/123

    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', ()=> {
  it('should update the todo', (done) => {
    // grab id of first item
    // update the text, set completed to true
    // assert 200
    // custom assertion: res has text prop and it changed, compelted it true, and completedAt is a number
    var hexId = todos[0]._id.toHexString();
    var text = "POOP CITY";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        //expect(res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done)=>{
    // grab id of second todo item
    // update text, set completed to false
    // 200
    // text is changed, compelted false, completed at is null

    var hexId = todos[1]._id.toHexString();
    var text = "POOP CITY";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: false      
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
})