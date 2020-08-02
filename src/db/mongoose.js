const mongoose = require('mongoose')

// mongodb://127.0.0.1:port/dbName
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // prevents deprecation warning
    useFindAndModify: false,
    useUnifiedTopology: true
})