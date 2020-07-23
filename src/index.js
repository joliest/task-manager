const express =  require('express')
require('./db/mongoose')

const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// make sure it's above app.use() calls
// middleware
app.use((req, res, next) => {
    res.status(503).send('Service temporarily unavailable')
})

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     // returns new token
//     const token = jwt.sign({ 
//         // data embedded to your token
//         _id: 'abcd123'
//         // add secret code
//      }, 'thisIsASecret', {
//          expiresIn: '7 days'
//      });
//      console.log(token)

//      // to verify if its a valid token, secret sould be the same
//      const data = jwt.verify(token, 'thisIsASecret')
//      console.log(data)
// }

// myFunction()