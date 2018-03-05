const passport = require('passport')
const config = require('./../../config')
const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.user

  app.route('/api/v1/signup')
    .post(api.signup(models.User))

  app.route('/api/v1/user')
    .get(passport.authenticate('jwt', config.session), api.getUserById(models.User, app.get('secret')))

  app.route('/api/v1/users')
    .get(passport.authenticate('jwt', config.session), api.getAll(models.User, app.get('secret')))
}
