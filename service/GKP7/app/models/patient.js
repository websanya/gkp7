const VaccineSchema = require('./patient/vaccine')
const RGSchema = require('./patient/rg')
const bloodClinicalResultSchema = require('./patient/bloodClinicalresult')
const urineClinicalResultSchema = require('./patient/urineClinicalResult')
const bloodBioChemicalResultSchema = require('./patient/bloodBioChemicalResult')
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
  passport: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  activeJob: JobSchema,
  hasActiveMedos: {
    type: Boolean,
    default: false
  },
  activeMedos: MedInspectionSchema,
  medicalInspections: [MedInspectionSchema],
  hasActiveRgResult: {
    type: Boolean,
    default: false
  },
  activeRgResult: RGSchema,
  rgResults: [RGSchema],
  bloodClinicalResults: [bloodClinicalResultSchema],
  urineClinicalResults: [urineClinicalResultSchema],
  bloodBioChemicalResults: [bloodBioChemicalResultSchema],
  vaccines: [VaccineSchema],
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

//* Проверить работает или нет.
Schema.pre('save', function (next) {
  this.vaccines.sort(sortByCreated)
  next()
})

mongoose.model('Patient', Schema)
