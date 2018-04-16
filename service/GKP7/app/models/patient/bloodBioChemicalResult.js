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
    sugar: String,
    cholesterol: String,
    prothrombin: String,
    inr: String
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
