const VaccineSchema = require('./vaccine')

const mongoose = require('mongoose')

// Sort anything
let sortByCreated = function (a, b) {
  // - negative a before b
  // 0 no change
  // + positive a after b
  return b.createdAt - a.createdAt
}

const Schema = mongoose.Schema({
  fio: String,
  dateBirth: Date,
  sex: Boolean,
  hasActiveMedos: {
    type: Boolean,
    default: false
  },
  vaccines: [VaccineSchema],
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
