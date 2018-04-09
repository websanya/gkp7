const passport = require('passport')
const config = require('./../../config')
const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.patient

  /**
   * Маршруты про пациентов.
   */

  app.route('/api/v1/patient')
    .post(passport.authenticate('jwt', config.session), api.makePatient(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/')
    .delete(passport.authenticate('jwt', config.session), api.removePatient(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/')
    .put(passport.authenticate('jwt', config.session), api.updatePatient(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:lastName/:firstName/:middleName/')
    .get(passport.authenticate('jwt', config.session), api.getPatientsByFIO(models.Patient, app.get('secret')))

  /**
   * Маршруты про медосмотры.
   */

  app.route('/api/v1/patient/:patId/active-medos/')
    .post(passport.authenticate('jwt', config.session), api.addActiveMedos(models.Patient, app.get('secret')))

  /**
   * Маршруты про прививки.
   */

  app.route('/api/v1/vaccine')
    .post(passport.authenticate('jwt', config.session), api.addVaccine(models.Patient, app.get('secret')))

  app.route('/api/v1/vaccine/:vacId/')
    .get(passport.authenticate('jwt', config.session), api.getVaccineById(models.Patient, app.get('secret')))

  app.route('/api/v1/vaccine')
    .put(passport.authenticate('jwt', config.session), api.updateVaccineById(models.Patient, app.get('secret')))

  app.route('/api/v1/vaccines/:patId/')
    .get(passport.authenticate('jwt', config.session), api.getVaccinesById(models.Patient, app.get('secret')))
}
