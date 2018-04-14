const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  vaccine: {
    vaccineName: String,
    drugName: String,
    drugSeries: String
  },
  vaccineType: String,
  dateVaccination: Date,
  dateRevaccination: Date,
  invasionMethod: String,
  dose: String,
  controlNumber: String,
  dateExpiration: Date,
  lpuCode: String,
  riskGroup: String,
  payment: String,
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
Schema.method('update', function (updates, callback) {
  Object.assign(this, updates, {updatedAt: new Date()})
  this.parent().save(callback)
})

module.exports = Schema
