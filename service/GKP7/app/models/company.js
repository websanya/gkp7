const mongoose = require('mongoose')

const DepartmentSchema = mongoose.Schema({
  departmentId: {
    type: Number,
    required: true
  },
  departmentName: {
    type: String,
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

const DivisionSchema = mongoose.Schema({
  divisionId: {
    type: Number,
    required: true
  },
  divisionFullName: {
    type: String,
    required: true
  },
  divisionName: {
    type: String,
    required: true
  },
  divisionDepartments: [DepartmentSchema],
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

const Schema = mongoose.Schema({
  companyId: {
    type: Number,
    unique: true,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyRate: {
    type: Number,
    required: true
  },
  companyDivisions: [DivisionSchema],
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

mongoose.model('Company', Schema)
