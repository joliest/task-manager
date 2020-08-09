const app = require('../src/app')
const req = require('supertest')

test('should sign up a new user', async () => {
    await req(app).post('/users').send({
            name: 'Andres',
            email: 'andrew@example.com',
            password: 'Logmein+1234'
        }).expect(201)
})