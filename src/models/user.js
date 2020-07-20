const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }    
    },
    age: {
        type: Number,
        default: 0,
        // custom validations
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    const ERROR = 'Unable to login'

    if (!user) {
        throw new Error(ERROR)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error(ERROR)
    }

    return user
}

// use function () {} to bind it
userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, 'thisIsASecretToken')

    // save the token into database
    user.tokens = user.tokens.concat({ token })
    user.save()

    return token
}

// hash the plain text before saving
userSchema.pre('save', async function(next) {

    // able to access User instance
    const user = this

    // encrypting password
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)    

module.exports = User