const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// runs some test code before every single test case
beforeEach((done) => {
  // empties DB before every request so our tests can pass
  Todo.remove({}).then(()=>{
    done();
  })
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
      Todo.find().then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      });
    })
  });

  it('should not create todo with invalid body data', (done) => {
    var text = '';

    request(app)
    .post('/todos')
    .send({text:text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => {
        done(e);
      })
    })
  });
});

