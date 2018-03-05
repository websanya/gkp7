const mongoose = require('mongoose')
const UserModel = require('../models/user')
const PatientModel = require('../models/patient')
const CompanyModel = require('../models/company')

const models = {
  User: mongoose.model('User'),
  Patient: mongoose.model('Patient'),
  Company: mongoose.model('Company')
}

module.exports = models
