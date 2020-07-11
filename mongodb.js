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
    // db.collection('users').insertOne({
    //     name: 'Joli',
    //     age: 28
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     // ops is array of documet
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Arlene',
    //         age: 22
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert users')
    //     }

    //     // ops is array of documet
    //     console.log(result.ops)
    // })

    db.collection('tasks').insertMany([
        {
            description: 'Go to church',
            completed: false
        },
        {
            description: 'Clean house',
            completed: true
        },
        {
            description: 'Watch Udemy',
            completed: true
        },
    ], (err, result) => {
        if (err) return console.log('Unable to insert tasks')

        console.log(result.ops)
    })
});