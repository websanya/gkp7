const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  rwDate: {
    type: Date,
    required: true
  },
  rwNumber: {
    type: Number,
    required: true
  },
  rwResult: Number,
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
