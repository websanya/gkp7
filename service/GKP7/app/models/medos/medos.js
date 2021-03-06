const mongoose = require('mongoose')
const JobSchema = require('./job')
const DoctorResultSchema = require('./doctorResult')
const ExamResultSchema = require('./examResult')

const ParametersSchema = mongoose.Schema({
  height: Number,
  weight: Number,
  pulse: Number,
  ad: {
    sys: Number,
    dia: Number
  },
  dynamometry: {
    left: Number,
    right: Number
  },
  skin: {
    norma: Boolean,
    pathology: String
  },
  cigarettes: Number,
  alcohol: String,
  comment: String
})

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
  mustExams: [{
    examId: {
      type: Number,
      required: true
    },
    examName: {
      type: String,
      required: true
    },
    examNote: String,
    examRoom: String
  }],
  addonExams: [{
    examId: {
      type: Number,
      required: true
    },
    examName: {
      type: String,
      required: true
    },
    examNote: String,
    examRoom: String
  }]
})

const DoctorSchema = mongoose.Schema({
  mustDoctors: [{
    doctorId: {
      type: Number,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    doctorRoom: String
  }],
  addonDoctors: [{
    doctorId: {
      type: Number,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    doctorRoom: String
  }]
})

const Schema = mongoose.Schema({
  medosType: Number,
  medosJob: JobSchema,
  medosRegistrationDate: {
    type: Date,
    default: Date.now
  },
  medosHarms: [HarmSchema],
  medosParameters: ParametersSchema,
  medosDoctors: DoctorSchema,
  medosExams: ExamSchema,
  medosDoctorResults: [DoctorResultSchema],
  medosExamResults: [ExamResultSchema],
  medosCompletionDate: Date,
  medosIsComplete: {
    type: Boolean,
    default: false
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
