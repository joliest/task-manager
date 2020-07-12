const mongodb = require('mongodb')
const { MongoClient, ObjectID } = mongodb


// better to use 127.0.0.1 instead of localhost
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID() // generates new ID for us
console.log(id)
console.log(id.getTimestamp())


MongoClient.connect(connectionURL, { useNewUrlParser: true,  useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    }


    // db ref
    const db = client.db(databaseName)
    // const updatePromise = db.collection('users')
    //     .updateOne({ _id: new ObjectID('5f09bfabc898393f44fe76ea') }, {
    //         $set: {
    //             name: 'Kukurikukuk'
    //         },
    //         $inc: {
    //             age: 1
    //         }
    //     });

    // updatePromise.then(result => {
    //     console.log(`result.matchedCount`)
    // }).catch(error => {
    //     console.log(error)
    // })

   db.collection('tasks')
        .updateMany({ completed: false }, {
            $set: { completed: true }
        }).then(({matchedCount}) => {
            console.log(`${matchedCount} rows updated`)
        }).catch(error => {
            console.log(error)
        }) 
});