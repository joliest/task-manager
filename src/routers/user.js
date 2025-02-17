const express = require('express')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

const router = new express.Router()
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file'))
        }

        cb(undefined, true)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        // removing the current token
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        // returns User model, able to access save()
        await req.user.save()

        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // works without 'dest' property
    // req.user.avatar = req.file.buffer

    // converts to png and resize it
    const buffer = await sharp(req.file.buffer)
                            .resize({ width: 250, height: 250 })
                            .png()
                            .toBuffer()

    req.user.avatar = req.file.buffer

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})


// profile of authenticated user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {

        // deleting yourself
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        const user =  req.user

        if (!user) {
            return res.status(500).send()
        }

        user.avatar = undefined
        await user.save()

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById( req.params.id )
        if (!user || !user.avatar) {
            return new Error('Unable to find image')
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router