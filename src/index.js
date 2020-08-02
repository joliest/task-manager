const express =  require('express')
require('./db/mongoose')

const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
// configuration
const upload = multer({
    dest: 'images'
})

// add upload as middleware
app.post('/upload', upload.single('nameOfUpload'), (req, res) => {
    res.send()
})

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})