const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  rgDate: {
    type: Date,
    required: true
  },
  rgType: {
    type: Number,
    required: true,
    default: 1
  },
  rgLocation: {
    rgLocationType: {
      type: Boolean,
      required: true,
      default: true
    },
    rgLocationComment: String
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

module.exports = Schema
