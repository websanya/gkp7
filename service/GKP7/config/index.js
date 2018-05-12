require('dotenv').config()

module.exports = {
  secret: process.env.SECRET_KEY,
  session: {session: false},
  database: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/gkp7?authSource=${process.env.DB_SOURCE}`
}
