const express =  require('express')
require('./db/mongoose')

const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    // returns new token
    const token = jwt.sign({ 
        // data embedded to your token
        _id: 'abcd123'
     }, 'thisismynewcourse');

     console.log(token)
}

myFunction()