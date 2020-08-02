const express =  require('express')
require('./db/mongoose')

const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
// configuration
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    // filters upload
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return callback(new Error('Please upload a word document'))
        }

        callback(undefined, true)
    }
})

// add upload as middleware
app.post('/upload', upload.single('nameOfUpload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    // its important to provide 4 options above
    res.status(400).send({
        error: error.message
    })
})

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})