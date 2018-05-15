const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  smearDate: {
    type: Date,
    required: true
  },
  smearNumber: {
    type: Number,
    required: true
  },
  smearResult: {
    smearGonococcus: Boolean,
    smearLeucocytes: Number,
    smearDiplococcus: Boolean,
    smearEpithelium: Boolean,
    smearFlora: String,
    smearSlime: String,
    smearTrichomonas: Boolean,
    smearFungus: Boolean,
    smearKeyCells: Boolean
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
