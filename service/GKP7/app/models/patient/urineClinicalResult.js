const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  urineDate: {
    type: Date,
    required: true
  },
  urineNumber: {
    type: Number,
    required: true
  },
  urineGeneral: {
    color: Number,
    reaction: Number,
    density: String,
    transparency: Boolean,
    protein: String,
    glucose: String,
    acetone: Number,
    bile: Boolean
  },
  urineElements: {
    flatEpithelium: String,
    tractEpithelium: String,
    renalEpithelium: String,
    leucocytes: String,
    erythrocytes: String,
    cylinders: {
      hyaline: String,
      granular: String,
      waxy: String,
      epithelial: String
    },
    salts: Number,
    slime: Boolean
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
