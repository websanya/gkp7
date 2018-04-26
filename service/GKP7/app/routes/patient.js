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

  app.route('/api/v1/patient/medos/:lastName/:firstName/:middleName/')
    .get(passport.authenticate('jwt', config.session), api.getMedosPatientsByFIO(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/active-medos/')
    .post(passport.authenticate('jwt', config.session), api.addActiveMedos(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/harms/')
    .put(passport.authenticate('jwt', config.session), api.updatePatientHarms(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/parameters/')
    .put(passport.authenticate('jwt', config.session), api.updatePatientParameters(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/doctorResult/')
    .post(passport.authenticate('jwt', config.session), api.addDoctorResult(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/doctorResult/:resultId/')
    .put(passport.authenticate('jwt', config.session), api.updateDoctorResult(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/examResult/')
    .post(passport.authenticate('jwt', config.session), api.addExamResult(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/examResult/:examId/')
    .put(passport.authenticate('jwt', config.session), api.updateExamResult(models.Patient, app.get('secret')))

  /**
   * Маршруты про снимки.
   */

  app.route('/api/v1/patient/:patId/rg/')
    .get(passport.authenticate('jwt', config.session), api.getPatientRgResults(models.Patient, app.get('secret')))
  app.route('/api/v1/patient/:patId/rg/')
    .post(passport.authenticate('jwt', config.session), api.registerPatientRgResult(models.Patient, app.get('secret')))
  app.route('/api/v1/patient/:patId/rg/')
    .put(passport.authenticate('jwt', config.session), api.finalizePatientRgResult(models.Patient, app.get('secret')))
  app.route('/api/v1/patient/:patId/rg/active/')
    .delete(passport.authenticate('jwt', config.session), api.removePatientActiveRg(models.Patient, app.get('secret')))
  app.route('/api/v1/patient/:patId/rg/:rgId/')
    .delete(passport.authenticate('jwt', config.session), api.removePatientCertainRg(models.Patient, app.get('secret')))
  app.route('/api/v1/patient/:patId/rgFull/')
    .post(passport.authenticate('jwt', config.session), api.addPatientRgResult(models.Patient, app.get('secret')))

  /**
   * Маршруты про анализы.
   */

  app.route('/api/v1/patient/:patId/analyze/')
    .post(passport.authenticate('jwt', config.session), api.addPatientAnalyze(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/analyze/:analyzeId/')
    .put(passport.authenticate('jwt', config.session), api.editPatientAnalyze(models.Patient, app.get('secret')))

  app.route('/api/v1/patient/:patId/analyze/:analyzeId/')
    .delete(passport.authenticate('jwt', config.session), api.removePatientAnalyze(models.Patient, app.get('secret')))

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
