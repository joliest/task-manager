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

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5f1bda44dc22681d8c8bf788')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5f1bd5fe34ecc947f0a3686c')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()