const mongoose = require('mongoose')

// mongodb://127.0.0.1:port/dbName
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})