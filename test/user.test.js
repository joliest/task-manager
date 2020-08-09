const app = require('../src/app')
const req = require('supertest')
const User = require('../src/models/user')
const { request } = require('express')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: 'Logmein+1234'
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