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
    color: {
      colorType: Number,
      colorName: String
    },
    reaction: {
      reactionType: Number,
      reactionName: String
    },
    density: String,
    transparency: Boolean,
    protein: String,
    glucose: {
      glucoseType: Number,
      glucoseName: String
    },
    acetone: {
      acetoneType: Number,
      acetoneName: String
    },
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
    salts: {
      saltsId: Number,
      saltsName: String
    },
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
