const passport = require('passport')
const config = require('./../../config')
const models = require('./../setup')

module.exports = (app) => {
  const api = app.GKP7.app.api.company

  //* Вернуть всю базу предприятий
  app.route('/api/v1/companies')
    .get(passport.authenticate('jwt', config.session), api.getAllCompanies(models.Company, app.get('secret')))

  /*
   * Маршруты добавления.
   */

  //* Добавить предприятие.
  app.route('/api/v1/company/')
    .post(passport.authenticate('jwt', config.session), api.addCompany(models.Company, app.get('secret')))

  //* Добавить цех.
  app.route('/api/v1/company/:companyId/')
    .post(passport.authenticate('jwt', config.session), api.addDivision(models.Company, app.get('secret')))

  //* Добавить участок.
  app.route('/api/v1/company/:companyId/:divisionId/')
    .post(passport.authenticate('jwt', config.session), api.addDepartment(models.Company, app.get('secret')))

  /*
   * Маршруты удаления.
   */

  //* Удалить предприятие.
  app.route('/api/v1/company/:companyId/')
    .delete(passport.authenticate('jwt', config.session), api.removeCompany(models.Company, app.get('secret')))

  //* Удалить цех.
  app.route('/api/v1/company/:companyId/:divisionId/')
    .delete(passport.authenticate('jwt', config.session), api.removeDivision(models.Company, app.get('secret')))

  //* Удалить участок.
  app.route('/api/v1/company/:companyId/:divisionId/:departmentId/')
    .delete(passport.authenticate('jwt', config.session), api.removeDepartment(models.Company, app.get('secret')))

  /*
   * Маршруты редактирования.
   */

  //* Редактировать предприятие.
  app.route('/api/v1/company/:companyId/')
    .put(passport.authenticate('jwt', config.session), api.editCompany(models.Company, app.get('secret')))

  //* Редактировать цех.
  app.route('/api/v1/company/:companyId/:divisionId/')
    .put(passport.authenticate('jwt', config.session), api.editDivision(models.Company, app.get('secret')))

  //* Редактировать участок.
  app.route('/api/v1/company/:companyId/:divisionId/:departmentId/')
    .put(passport.authenticate('jwt', config.session), api.editDepartment(models.Company, app.get('secret')))
}
