const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.auth
  app.route('/').get(
    (req, res) => res.send('GKP7 API')
  )
  app.route('/api/v1/auth').post(
    api.login(models.User)
  )
}
