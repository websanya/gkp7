const passport = require('passport')
const config = require('./../../config')
const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.patient

  /**
   * Маршруты про пациентов.
   */

  //* Добавляем пациента в базу.
  app.route('/api/v1/patient')
    .post(passport.authenticate('jwt', config.session), api.makePatient(models.Patient, app.get('secret')))

  //* Редактируем пациента в базе.
  app.route('/api/v1/patient/:patId/')
    .put(passport.authenticate('jwt', config.session), api.updatePatient(models.Patient, app.get('secret')))

  //* Удаляем пациента из базы.
  app.route('/api/v1/patient/:patId/')
    .delete(passport.authenticate('jwt', config.session), api.removePatient(models.Patient, app.get('secret')))

  //* Подгружаем пациентов из базы по ФИО.
  app.route('/api/v1/patient/:lastName/:firstName/:middleName/')
    .get(passport.authenticate('jwt', config.session), api.getPatientsByFIO(models.Patient, app.get('secret')))

  /**
   * Маршруты про медосмотры.
   */

  //* Ставим на медосмотр.
  app.route('/api/v1/patient/:patId/medos/')
    .post(passport.authenticate('jwt', config.session), api.addActiveMedos(models.Patient, app.get('secret')))

  //* Убираем с медосмотра.
  app.route('/api/v1/patient/:patId/medos/')
    .delete(passport.authenticate('jwt', config.session), api.removeActiveMedos(models.Patient, app.get('secret')))

  //* Подгружаем пациентов на медосмотре из базы по ФИО.
  app.route('/api/v1/patient/medos/:lastName/:firstName/:middleName/')
    .get(passport.authenticate('jwt', config.session), api.getMedosPatientsByFIO(models.Patient, app.get('secret')))

  //* Редактируем параметры пациента.
  app.route('/api/v1/patient/:patId/parameters/')
    .put(passport.authenticate('jwt', config.session), api.updatePatientParameters(models.Patient, app.get('secret')))

  //* Редактируем вредности пациента.
  app.route('/api/v1/patient/:patId/harms/')
    .put(passport.authenticate('jwt', config.session), api.updatePatientHarms(models.Patient, app.get('secret')))

  //* Добавляем осмотр доктора.
  app.route('/api/v1/patient/:patId/doctorResult/')
    .post(passport.authenticate('jwt', config.session), api.addDoctorResult(models.Patient, app.get('secret')))

  //* Редактируем осмотр доктора.
  app.route('/api/v1/patient/:patId/doctorResult/:resultId/')
    .put(passport.authenticate('jwt', config.session), api.updateDoctorResult(models.Patient, app.get('secret')))

  //* Добавляем обследование.
  app.route('/api/v1/patient/:patId/examResult/')
    .post(passport.authenticate('jwt', config.session), api.addExamResult(models.Patient, app.get('secret')))

  //* Редактируем обследование.
  app.route('/api/v1/patient/:patId/examResult/:examId/')
    .put(passport.authenticate('jwt', config.session), api.updateExamResult(models.Patient, app.get('secret')))

  //* Архивируем медосмотр.
  app.route('/api/v1/patient/:patId/medosFinal/')
    .post(passport.authenticate('jwt', config.session), api.addFinalResult(models.Patient, app.get('secret')))

  //* Подгружаем пациентов на медосмотре из базы по ФИО.
  app.route('/api/v1/patient/archive/:lastName/:firstName/:middleName/')
    .get(passport.authenticate('jwt', config.session), api.getArchivePatientsByFIO(models.Patient, app.get('secret')))

  /**
   * Маршруты про снимки.
   */

  //* Добавляем снимок пациенту.
  app.route('/api/v1/patient/:patId/rg/')
    .post(passport.authenticate('jwt', config.session), api.addPatientRgResult(models.Patient, app.get('secret')))

  //* Редактируем снимок пациенту.
  app.route('/api/v1/patient/:patId/rg/:rgId/')
    .put(passport.authenticate('jwt', config.session), api.editPatientRgResult(models.Patient, app.get('secret')))

  //* Удаляем снимок пациенту.
  app.route('/api/v1/patient/:patId/rg/:rgId/')
    .delete(passport.authenticate('jwt', config.session), api.removePatientRgResult(models.Patient, app.get('secret')))

  /**
   * Маршруты про анализы.
   */

  //* Добавляем анализ пациенту.
  app.route('/api/v1/patient/:patId/analyze/')
    .post(passport.authenticate('jwt', config.session), api.addPatientAnalyze(models.Patient, app.get('secret')))

  //* Редактируем анализ пациенту.
  app.route('/api/v1/patient/:patId/analyze/:analyzeId/')
    .put(passport.authenticate('jwt', config.session), api.editPatientAnalyze(models.Patient, app.get('secret')))

  //* Удаляем анализ пациенту.
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
