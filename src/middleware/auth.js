const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        // decodes the binded data e.g. _id
        const decoded = jwt.verify(token, 'thisIsASecretToken')

        // find user with the id and if it has the given token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error()
        }

        // store the token in request, to be accessed in routers
        req.token = token
        req.user = user
        
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth