const mongoose = require('mongoose')
const UserModel = require('../models/user')
const PatientModel = require('../models/patient')
const CompanyModel = require('../models/company')
const HarmModel = require('../models/harm')

const models = {
  User: mongoose.model('User'),
  Patient: mongoose.model('Patient'),
  Company: mongoose.model('Company'),
  Harm: mongoose.model('Harm')
}

module.exports = models
