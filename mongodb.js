const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient


// better to use 127.0.0.1 instead of localhost
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }


    // db ref
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        name: 'Joli',
        age: 28
    })
});