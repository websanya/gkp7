const mongoose = require('mongoose')

const ExamSchema = mongoose.Schema({
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
})

const DoctorSchema = mongoose.Schema({
  doctorId: {
    type: Number,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  doctorRoom: String
})

const Schema = mongoose.Schema({
  harmId: {
    type: Number,
    required: true
  },
  harmName: {
    type: String,
    required: true
  },
  doctors: [DoctorSchema],
  exams: [ExamSchema]
})

mongoose.model('Harm', Schema)
