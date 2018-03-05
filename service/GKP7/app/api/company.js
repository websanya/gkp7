const mongoose = require('mongoose')

const api = {}

//* Вернуть всю базу предприятий.
api.getAllCompanies = (Company, Token) => (req, res) => {
  if (Token) {
    Company.find({}, (err, companies) => {
      if (err) res.status(400).json(err)
      if (companies) {
        res.status(200).json({success: true, companies: companies})
      } else {
        res.status(200).json({success: false, message: 'Компаний не найдено.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Удалить предприятие.
api.removeCompany = (Company, Token) => (req, res) => {
  if (Token) {
    Company.findOneAndRemove({'companyId': req.params.companyId}, (err, company) => {
      if (err) res.status(400).json(err)
      if (company) {
        res.status(200).json({success: true, message: 'Предприятие удалено.'})
      } else {
        res.status(200).json({success: false, message: 'Такое предприятие не найдено.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Удалить цех.
api.removeDivision = (Company, Token) => (req, res) => {
  if (Token) {
    Company.findOneAndUpdate(
      {'companyId': req.params.companyId},
      {$pull: {'companyDivisions': {'divisionId': req.params.divisionId}}},
      {rawResult: true},
      (err, company) => {
        if (err) res.status(400).json(err)
        if (company) {
          res.status(200).json({success: true, message: 'Цех удален.'})
        } else {
          res.status(200).json({success: false, message: 'Такой цех не найден.'})
        }
      })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Удалить участок.
api.removeDepartment = (Company, Token) => (req, res) => {
  if (Token) {
    Company.findOneAndUpdate(
      {'companyId': parseInt(req.params.companyId)},
      {$pull: {'companyDivisions.$[element].divisionDepartments': {'departmentId': parseInt(req.params.departmentId)}}},
      {arrayFilters: [{'element.divisionId': parseInt(req.params.divisionId)}], rawResult: true},
      (err, company) => {
        if (err) res.status(400).json(err)
        if (company) {
          res.status(200).json({success: true, message: 'Участок удален.', raw: company})
        } else {
          res.status(200).json({success: false, message: 'Не найдено.'})
        }
      }
    )
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Добавить предприятие.
api.addCompany = (Company, Token) => (req, res) => {
  if (Token) {
    if (req.body.companyId && req.body.companyName && req.body.companyRate) {
      Company.create(
        {
          'companyId': req.body.companyId,
          'companyName': req.body.companyName,
          'companyRate': req.body.companyRate
        },
        (err, company) => {
          if (err) res.status(400).json(err)
          if (company) {
            res.status(200).json({success: true, message: 'Предприятие добавлено.'})
          } else {
            res.status(200).json({success: false, message: 'Не найдено.'})
          }
        }
      )
    } else return res.status(200).json({success: false, message: 'Нужные параметры не указаны'})
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Добавить цех.
api.addDivision = (Company, Token) => (req, res) => {
  if (Token) {
    if (req.body.divisionId && req.body.divisionName && req.body.divisionFullName) {
      Company.findOneAndUpdate(
        {'companyId': req.params.companyId},
        {
          $push: {
            'companyDivisions': {
              'divisionId': req.body.divisionId,
              'divisionName': req.body.divisionName,
              'divisionFullName': req.body.divisionFullName
            }
          }
        },
        (err, company) => {
          if (err) res.status(400).json(err)
          if (company) {
            res.status(200).json({success: true, message: 'Цех добавлен.'})
          } else {
            res.status(200).json({success: false, message: 'Не найдено.'})
          }
        }
      )
    } else return res.status(200).json({success: false, message: 'Нужные параметры не указаны'})
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Добавить участок.
api.addDepartment = (Company, Token) => (req, res) => {
  if (Token) {
    if (req.body.departmentId && req.body.departmentName) {
      Company.findOneAndUpdate(
        {'companyId': parseInt(req.params.companyId)},
        {
          $push: {
            'companyDivisions.$[element].divisionDepartments': {
              'departmentId': req.body.departmentId,
              'departmentName': req.body.departmentName
            }
          }
        },
        {arrayFilters: [{'element.divisionId': parseInt(req.params.divisionId)}], rawResult: true},
        (err, company) => {
          if (err) res.status(400).json(err)
          if (company) {
            res.status(200).json({success: true, message: 'Участок добавлен.'})
          } else {
            res.status(200).json({success: false, message: 'Не найдено.'})
          }
        }
      )
    } else return res.status(200).json({success: false, message: 'Нужные параметры не указаны'})
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Редактировать предприятие.
api.editCompany = (Company, Token) => (req, res) => {
  if (Token) {
    if (req.body.companyId || req.body.companyName || req.body.companyRate) {
      let tempObj = {}
      if (req.body.companyId) {
        tempObj.companyId = req.body.companyId
      }
      if (req.body.companyName) {
        tempObj.companyName = req.body.companyName
      }
      if (req.body.companyRate) {
        tempObj.companyRate = req.body.companyRate
      }
      if (req.body.userId) {
        tempObj.updatedBy = mongoose.Types.ObjectId(req.body.userId)
      }
      tempObj.updatedAt = Date.now()

      Company.findOneAndUpdate(
        {'companyId': req.params.companyId},
        {$set: tempObj},
        {rawResult: true},
        (err, company) => {
          if (err) res.status(400).json(err)
          if (company) {
            res.status(200).json({success: true, message: 'Компания отредактирована.'})
          } else {
            res.status(200).json({success: false, message: 'Не найдено.'})
          }
        })
    }
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Редактировать цех.
api.editDivision = (Company, Token) => (req, res) => {
  if (Token) {
    if (req.body.divisionId || req.body.divisionName || req.body.divisionFullName) {

      let tempObj = {}
      let tempFromDb = {}

      Company.findOne(
        {'companyId': parseInt(req.params.companyId)},
        (err, companyFromDb) => {
          if (err) res.status(400).json(err)
          if (companyFromDb) {
            tempFromDb = companyFromDb.companyDivisions.filter(function (obj) {
              return obj.divisionId === parseInt(req.params.divisionId)
            })[0]

            tempObj.divisionDepartments = tempFromDb.divisionDepartments
            tempObj.createdAt = tempFromDb.createdAt

            if (req.body.divisionId) {
              tempObj.divisionId = req.body.divisionId
            }
            if (req.body.divisionName) {
              tempObj.divisionName = req.body.divisionName
            }
            if (req.body.divisionFullName) {
              tempObj.divisionFullName = req.body.divisionFullName
            }
            if (req.body.userId) {
              tempObj.updatedBy = mongoose.Types.ObjectId(req.body.userId)
            }
            tempObj.updatedAt = Date.now()

            Company.findOneAndUpdate(
              {'companyId': req.params.companyId},
              {$set: {'companyDivisions.$[element]': tempObj}},
              {arrayFilters: [{'element.divisionId': parseInt(req.params.divisionId)}], rawResult: true},
              (err, company) => {
                if (err) res.status(400).json(err)
                if (company) {
                  res.status(200).json({success: true, message: 'Цех отредактирован.'})
                } else {
                  res.status(200).json({success: false, message: 'Не найдено.'})
                }
              }
            )
          }
        }
      )
    }
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Редактировать участок.
api.editDepartment = (Company, Token) => (req, res) => {
  if (Token) {
    if (req.body.departmentId || req.body.departmentName) {
      let tempFromDb = {}
      let tempObj = {}

      Company.findOne(
        {'companyId': parseInt(req.params.companyId)},
        (err, companyFromDb) => {
          if (err) res.status(400).json(err)
          if (companyFromDb) {
            tempFromDb = companyFromDb.companyDivisions.filter(function (obj) {
              return obj.divisionId === parseInt(req.params.divisionId)
            })[0].divisionDepartments.filter(function (obj) {
              return obj.departmentId === parseInt(req.params.departmentId)
            })[0]

            if (tempFromDb === undefined) {
              res.status(200).json({success: false, message: 'Не найдено.'})
            }

            tempObj.createdAt = tempFromDb.createdAt

            if (req.body.departmentId) {
              tempObj.departmentId = req.body.departmentId
            } else {
              tempObj.departmentId = tempFromDb.departmentId
            }
            if (req.body.departmentName) {
              tempObj.departmentName = req.body.departmentName
            } else {
              tempObj.departmentName = tempFromDb.departmentName
            }
            if (req.body.userId) {
              tempObj.updatedBy = mongoose.Types.ObjectId(req.body.userId)
            }
            tempObj.updatedAt = Date.now()

            Company.findOneAndUpdate(
              {'companyId': req.params.companyId},
              {$set: {'companyDivisions.$[element1].divisionDepartments.$[element2]': tempObj}},
              {
                arrayFilters: [
                  {'element1.divisionId': parseInt(req.params.divisionId)},
                  {'element2.departmentId': parseInt(req.params.departmentId)}
                ],
                rawResult: true
              },
              (err, company) => {
                if (err) res.status(400).json(err)
                if (company) {
                  res.status(200).json({success: true, message: 'Участок отредактирован.'})
                } else {
                  res.status(200).json({success: false, message: 'Не найдено.'})
                }
              }
            )
          }
        }
      )
    }
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

module.exports = api
