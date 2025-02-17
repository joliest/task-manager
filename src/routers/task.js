const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**
 * GET /tasks?completed=true
 * GET /tasks?limit=10
 * GET /tasks?skip=10
 * GET /tasks?createdAt:desc
 */
router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({ owner: req.user._id })
        // res.send(tasks)

        const match = {}
        const sort = {}

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update))

    if (!isUpdateValid) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        task.save()

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const taskToBeDeleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!taskToBeDeleted) {
            return res.send(404).send()
        }
        
        res.send(taskToBeDeleted)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router