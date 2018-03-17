// Mongo client lets you connect to MongoDB Server

//Fetching Data

const {MongoClient, ObjectID} = require('mongodb'); // identical to above

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connected to MongoDB server');

    /*
    db.collection('todos').find().toArray().then((docs) => {
        console.log('todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    }); // an array of all documents that is a Promise
    */
    // Find documents whose completed value is false
    /*
    db.collection('todos').find({completed: true}).toArray().then((docs) => {
        console.log('todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });*/

    // _id of Walk the Dog Document 5aa5c258e3b1131953b3ac0e
    /*
    db.collection('todos').find({
        _id: new ObjectID("5aa5c258e3b1131953b3ac0e")
    }).toArray().then((docs) => {
        console.log('todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });*/
    /*
    db.collection('todos').find().count().then((count) => {
        console.log(`todos count : ${count}`);
        
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });*/

    db.collection('Users').find({"name": "Kevin"}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
        
    }, (err) => {
        console.log('Unable to fetch USers', err);
    });
    //db.close();
});