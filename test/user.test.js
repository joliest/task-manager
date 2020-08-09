const app = require('../src/app')
const req = require('supertest')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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

beforeEach(async () => {
    // wipes out User document
    await User.deleteMany()
    await new User(userOne).save()
})

test('should sign up a new user', async () => {
    await req(app).post('/users').send({
            name: 'Andres',
            email: 'andrew@example.com',
            password: 'Logmein+1234'
        }).expect(201)
})

test('Should login existing user', async () => {
    await req(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login non-existent user', async () => {
    await req(app).post('/users/login').send({
        email: 'notValid@gmail.com',
        password: '12345'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await req(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await req(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('should delete account for user', async () => {
    await req(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('should not delete account for unauthentucated user', async () => {
    await req(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


