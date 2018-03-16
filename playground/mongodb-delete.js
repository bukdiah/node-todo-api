// Mongo client lets you connect to MongoDB Server

//Fetching Data

const {MongoClient, ObjectID} = require('mongodb'); // identical to above

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }

    console.log('Connected to MongoDB server');

    // deleteMany target many docs and delete
    /*
    db.collection('todos').deleteMany({
        text: 'Farty'
    }).then((result) => {
        console.log(result);
    });*/

    // deleteOne 
    /*
    db.collection('todos').deleteOne({text: 'Farty'}).then((result) => {
        console.log(result);
    });*/
    // findOneAndDelete delete one item and return it's value
    
    db.collection('todos').findOneAndDelete({_id: new ObjectID("5aac3ec2d9d677257bb18697")}).then((result) => {
        console.log(result);
    });
    
    //db.close();
});