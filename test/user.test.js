const app = require('../src/app')
const req = require('supertest')
const User = require('../src/models/user')

const { userOneId, userOne, setupDatabase } = require('./fixtures/db')


beforeEach(setupDatabase)

test('should sign up a new user', async () => {
    const response = await req(app).post('/users').send({
            name: 'Andres',
            email: 'andrew@example.com',
            password: 'Logmein+1234'
        }).expect(201)

    // assert that the database is changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assert response body
    expect(response.body).toMatchObject({
        user: {
            name: 'Andres',
            email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    })

    // assert response body
    expect(user.password).not.toBe('Logmein+1234')
})

test('Should login existing user', async () => {
    const response = await req(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // response token should match user 2nd token
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
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
    const response = await req(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // check if user gets deleted into database
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})


test('should not delete account for unauthentucated user', async () => {
    await req(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await req(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await req(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Kokey'
        })
        .expect(200)

    const user = await User.findById(userOne)
    expect(user.name).toBe('Kokey')
})

test('Should not update invalid user fields', async () => {
    await req(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Test'
        })
        .expect(400)
})
