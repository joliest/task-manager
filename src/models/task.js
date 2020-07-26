const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
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
}, {
  timestamps: true
})

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task