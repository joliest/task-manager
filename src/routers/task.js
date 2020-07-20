const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        task.save()
        res.status(201).send(result)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update))

    if (!isUpdateValid) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findById(req.params.id);
        updates.forEach(update => task[update] = req.body[update])
        task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router