const mongoose = require('mongoose')

// mongodb://127.0.0.1:port/dbName
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'My first task',
    completed: true
})

task.save().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

const me = new User({ 
    name: 'Joli',
    age: 23
})

me.save().then(res => {
        console.log('Me: ', res)
    }).catch(err => {
        console.log(err)
    });
