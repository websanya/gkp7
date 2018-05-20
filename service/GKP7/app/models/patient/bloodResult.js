const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  bloodDate: {
    type: Date,
    required: true
  },
  bloodNumber: {
    type: Number,
    required: true
  },
  bloodResult: {
    hemoglobin: String,
    leucocytes: String,
    esr: String,
    basophils: String,
    eosinophils: String,
    blasts: String,
    myelocytes: String,
    young: String,
    sticks: String,
    segments: String,
    lymphocytes: String,
    monocytes: String,
    normoblasts: String,
    tng: String,
    sugar: String,
    cholesterol: String
  },
  medosId: mongoose.Schema.Types.ObjectId,
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
