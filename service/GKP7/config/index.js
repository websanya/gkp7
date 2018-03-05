require('dotenv').config()

module.exports = {
  secret: process.env.SECRET_KEY,
  session: {session: false},
  database: 'mongodb://localhost/gkp7'
}
