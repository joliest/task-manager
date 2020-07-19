const express =  require('express')
require('./db/mongoose')
const Task = require('./models/task')

const UserRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

// to automatically parse incoming json to js object {}
app.use(express.json())
app.use(UserRouter)

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        task.save()
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update))

    if (!isUpdateValid) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById({ _id: req.params.id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskToBeDeleted = await Task.findByIdAndDelete(req.params.id)

        if (!taskToBeDeleted) {
            return res.send(404).send()
        }

        res.send(taskToBeDeleted)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})