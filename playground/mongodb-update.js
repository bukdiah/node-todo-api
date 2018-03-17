// Mongo client lets you connect to MongoDB Server

//Fetching Data

const {MongoClient, ObjectID} = require('mongodb'); // identical to above

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connected to MongoDB server');

    // findOneAndUpdate
    /*
    db.collection('todos').findOneAndUpdate({
        _id: new ObjectID('5aac3ec8d9d677257bb18698')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });*/

    // _id for User 5aa5bd29e4b2cb11b47a6879
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5aa5bd29e4b2cb11b47a6879')
    }, {
        $set: {
            name: "POOPY"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    //db.close();
});

