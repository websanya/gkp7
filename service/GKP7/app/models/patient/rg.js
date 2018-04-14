const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  rgDate: {
    type: Date,
    required: true
  },
  rgType: {
    rgTypeId: {
      type: Number,
      required: true,
      default: 1
    },
    rgTypeName: {
      type: String,
      required: true,
      default: 'Флюорография'
    }
  },
  rgLocation: {
    rgLocationType: {
      type: Number,
      required: true
    },
    rgLocationComment: {
      type: String,
      required: true
    }
  },
  rgResult: {
    rgResultType: {
      type: Boolean,
      required: true
    },
    rgResultComment: {
      type: String,
      required: true
    }
  },
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
