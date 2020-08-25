/**
 * contains code to setup database up
 */
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')


 // simulate authentication
const userOneId = new mongoose.Types.ObjectId
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'Logmein+1234',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET )
    }]
}

const userTwoId = new mongoose.Types.ObjectId
const userTwo = {
    _id: userTwoId,
    name: 'Popoy',
    email: 'popy@example.com',
    password: 'Logmein+1234',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET )
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description: 'my first task from unit testing',
    completed: false,
    owner: userOneId,
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'my second task from unit testing',
    completed: true,
    owner: userOneId,
}

const taskThree = {
    _id: new mongoose.Types.ObjectId,
    description: 'my third task from unit testing',
    completed: true,
    owner: userTwoId,
}

const setupDatabase = async () => {
    // wipes out User document
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    taskThree,
}