const passport = require('passport')
const config = require('./../../config')
const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.patient

  app.route('/api/v1/makepatient')
    .post(passport.authenticate('jwt', config.session), api.makePatient(models.Patient, app.get('secret')))

  app.route('/api/v1/patient')
    .post(passport.authenticate('jwt', config.session), api.getPatientByFIO(models.Patient, app.get('secret')))

  app.route('/api/v1/patient')
    .get(passport.authenticate('jwt', config.session), api.getPatientById(models.Patient, app.get('secret')))

  app.route('/api/v1/vaccine')
    .post(passport.authenticate('jwt', config.session), api.addVaccine(models.Patient, app.get('secret')))

  app.route('/api/v1/vaccine/:vacId/')
    .get(passport.authenticate('jwt', config.session), api.getVaccineById(models.Patient, app.get('secret')))

  app.route('/api/v1/vaccine')
    .put(passport.authenticate('jwt', config.session), api.updateVaccineById(models.Patient, app.get('secret')))

  app.route('/api/v1/vaccines/:patId')
    .get(passport.authenticate('jwt', config.session), api.getVaccinesById(models.Patient, app.get('secret')))
}
