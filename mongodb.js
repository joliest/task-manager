const mongodb = require('mongodb')
const { MongoClient, ObjectID } = mongodb


// better to use 127.0.0.1 instead of localhost
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID() // generates new ID for us
console.log(id)
console.log(id.getTimestamp())


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }


    // db ref
    const db = client.db(databaseName)
    db.collection('users').findOne({ name: 'Joli', age: 28}, (error, result) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(result)
    })
});