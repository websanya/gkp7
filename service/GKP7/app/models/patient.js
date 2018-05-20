const VaccineSchema = require('./patient/vaccine')
const RGSchema = require('./patient/rg')
const bloodResultSchema = require('./patient/bloodResult')
const urineClinicalResultSchema = require('./patient/urineClinicalResult')
const smearResultSchema = require('./patient/smearResult')
const rwResultSchema = require('./patient/rwResult')
const JobSchema = require('./medos/job')
const MedInspectionSchema = require('./medos/medos')

const mongoose = require('mongoose')

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
  address: {
    type: String,
    required: true
  },
  activeJob: JobSchema,
  hasActiveMedos: {
    type: Boolean,
    default: false
  },
  activeMedos: MedInspectionSchema,
  medosArchive: [MedInspectionSchema],
  rgResults: [RGSchema],
  bloodResults: [bloodResultSchema],
  urineClinicalResults: [urineClinicalResultSchema],
  smearResults: [smearResultSchema],
  rwResults: [rwResultSchema],
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

mongoose.model('Patient', Schema)
