/**
 * contains code to setup database up
 */
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')


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

const setupDatabase = async () => {
    // wipes out User document
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase,
}