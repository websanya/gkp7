const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  jobCompany: {
    type: Number,
    required: true
  },
  jobDivision: {
    type: Number,
    required: true
  },
  jobName: {
    type: String,
    required: true
  },
  jobPersonnelNumber: {
    type: Number,
    required: true
  },
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
