const passport = require('passport')
const config = require('./../../config')
const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.mkb

  //* Вернуть всю базу диагнозов.
  app.route('/api/v1/mkbs')
    .get(passport.authenticate('jwt', config.session), api.getAllMkbs(models.Mkb, app.get('secret')))
}
