const VaccineSchema = require('./vaccine')
const JobSchema = require('./medos/job')
const MedInspectionSchema = require('./medos/medos')

const mongoose = require('mongoose')

// Sort anything
let sortByCreated = function (a, b) {
  // - negative a before b
  // 0 no change
  // + positive a after b
  return b.createdAt - a.createdAt
}

const Schema = mongoose.Schema({
  fio: {
    type: String,
    required: true
  },
  dateBirth: {
    type: Date,
    required: true
  },
  sex: {
    type: Boolean,
    required: true
  },
  hasActiveMedos: {
    type: Boolean,
    default: false
  },
  passport: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  vaccines: [VaccineSchema],
  rg_results: [],
  activeJob: JobSchema,
  medicalInspections: [MedInspectionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

//* Проверить работает или нет.
Schema.pre('save', function (next) {
  this.vaccines.sort(sortByCreated)
  next()
})

mongoose.model('Patient', Schema)
