const mongoose = require('mongoose')
const JobSchema = require('./job')

const HarmSchema = mongoose.Schema({
  harmId: {
    type: Number,
    required: true
  },
  harmName: {
    type: String,
    required: true
  }
})

const ExamSchema = mongoose.Schema({
  examId: {
    type: Number,
    required: true
  },
  examName: {
    type: String,
    required: true
  },
  examNote: String
})

const DoctorSchema = mongoose.Schema({
  doctorId: {
    type: Number,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  }
})

const Schema = mongoose.Schema({
  medosType: {
    typeId: Number,
    typeName: String
  },
  medosJob: JobSchema,
  medosHarms: [HarmSchema],
  medosDoctors: [DoctorSchema],
  medosExams: [ExamSchema],
  medosRegistrationDate: {
    type: Date,
    default: Date.now
  },
  medosCompletionDate: Date,
  medosIsComplete: {
    type: Boolean,
    default: false
  },
  medosIsActive: {
    type: Boolean,
    default: false
  },
  medosResults: [],
  medosVisits: [],
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
