// Mongo client lets you connect to MongoDB Server

//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); // identical to above

//var obj = new ObjectID();
//console.log(obj);

// Object Destructuring example
/*
var user = {'name': 'andrew', age: 25};
var {name} = user; // name u wanna pull out and assign the object u wanna destructure
console.log(name); // prints andrew
*/
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connected to MongoDB server');
    /*
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });*/

    // insert new doc into users (name, age, location)
    /*
    db.collection('Users').insertOne({
        name: 'Kevin',
        age: 50,
        location: 'NJ'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert User', err);
        }

        //console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });
    */
    db.close();
});