const mongoose = require('mongoose')
const validator = require('validator')

// mongodb://127.0.0.1:port/dbName
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }    
    },
    age: {
        type: Number,
        default: 0,
        // custom validations
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be valid')
            }
        }
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

// const task = new Task({
//     description: 'My first task',
//     completed: true
// })

// task.save().then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

const me = new User({ 
    name: 'Arlene    ',
    email: 'aja@gmail.COM'
})

me.save().then(res => {
        console.log('Me: ', res)
    }).catch(err => {
        console.log(err)
    });
