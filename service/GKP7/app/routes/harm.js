const passport = require('passport')
const config = require('./../../config')
const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.harm

  //* Вернуть всю базу вредностей.
  app.route('/api/v1/harms')
    .get(passport.authenticate('jwt', config.session), api.getAllHarms(models.Harm, app.get('secret')))
}
