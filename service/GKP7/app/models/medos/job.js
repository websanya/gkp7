const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  jobCompany: {
    jobCompanyId: {
      type: Number,
      required: true
    },
    jobCompanyName: {
      type: String,
      required: true
    }
  },
  jobDivision: {
    jobDivisionId: {
      type: Number,
      required: true
    },
    jobDivisionName: {
      type: String,
      required: true
    }
  },
  jobDepartment: {
    jobDepartmentId: {
      type: Number,
      required: true
    },
    jobDepartmentName: {
      type: String,
      required: true
    }
  },
  jobName: {
    type: String,
    required: true
  },
  jobPersonnelNumber: {
    type: Number,
    required: true
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
