const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  mkbCode: String,
  mkbName: String
})

mongoose.model('Mkb', Schema)
