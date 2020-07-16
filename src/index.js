const express =  require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

// to automatically parse incoming json to js object {}
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(result => {
        res.send(result)
    }).catch(error => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})