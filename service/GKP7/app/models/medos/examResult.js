const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  examId: {
    type: Number,
    required: true
  },
  examResult: {},
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = Schema
