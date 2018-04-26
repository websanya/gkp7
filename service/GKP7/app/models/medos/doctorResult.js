const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  doctorId: {
    type: Number,
    required: true
  },
  doctorSpecial: {},
  doctorComplaints: String,
  doctorStatus: String,
  doctorDiagnosis: {
    diagnosis: String,
    detectability: Boolean,
    diagnosisComment: String
  },
  doctorConclusion: [String],
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
