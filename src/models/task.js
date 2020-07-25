const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
  description: {
      type: String,
      required: true,
      trim: true
  },
  completed: {
      type: Boolean,
      default: false
  },
  owner: {
    // Object Id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // access User model by id
    ref: 'User'
  }
})

module.exports = Task