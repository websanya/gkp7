const api = {}

/**
 * Методы про пациентов.
 */

//* Добавляем пациента в базу.
api.makePatient = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempPatient = req.body.editPatient
    if (!tempPatient.fio) {
      api.errorHandler(res, 'Не указаны ФИО')
    } else if (!tempPatient.dateBirth) {
      api.errorHandler(res, 'Не указана дата рождения')
    } else if (tempPatient.sex === '' || tempPatient.sex === undefined) {
      api.errorHandler(res, 'Не указан пол')
    } else if (!tempPatient.passport) {
      api.errorHandler(res, 'Не указан паспорт')
    } else if (!tempPatient.address) {
      api.errorHandler(res, 'Не указан адрес')
    } else if (!tempPatient.phone) {
      api.errorHandler(res, 'Не указан номер телефона')
    } else {
      //* Создаем объект будущего пациента.
      let patient = new Patient({
        fio: tempPatient.fio,
        dateBirth: api.dateToIso(tempPatient.dateBirth),
        sex: tempPatient.sex,
        passport: tempPatient.passport,
        address: tempPatient.address,
        phone: tempPatient.phone
      })
      if (tempPatient.activeJob !== undefined) {
        patient.activeJob = tempPatient.activeJob
      }
      //* Сохраняем в базу данных.
      patient.save(err => {
        if (err) {
          res.status(200).json({
            success: false,
            message: 'Ошибка при создании пациента.'
          })
        } else {
          res.status(200).json({
            success: true,
            message: 'Пациент создан успешно!'
          })
        }
      })
    }
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Редактируем пациента в базе.
api.updatePatient = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempPatient = req.body.editPatient
    if (!tempPatient.fio) {
      api.errorHandler(res, 'Не указаны ФИО')
    } else if (!tempPatient.dateBirth) {
      api.errorHandler(res, 'Не указана дата рождения')
    } else if (tempPatient.sex === '' || tempPatient.sex === undefined || tempPatient.sex === null) {
      api.errorHandler(res, 'Не указан пол')
    } else if (!tempPatient.passport) {
      api.errorHandler(res, 'Не указан паспорт')
    } else if (!tempPatient.address) {
      api.errorHandler(res, 'Не указан адрес')
    } else if (!tempPatient.phone) {
      api.errorHandler(res, 'Не указан номер телефона')
    }
    if (!tempPatient.activeJob) {
      tempPatient.activeJob = {}
    } else {
      tempPatient.activeJob.updatedAt = new Date()
    }
    tempPatient.updatedAt = new Date()
    tempPatient.dateBirth = api.dateToIso(tempPatient.dateBirth)
    Patient.findByIdAndUpdate(req.params.patId, {
      $set: tempPatient
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Пациент обновлен.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Удаляем пациента из базы.
api.removePatient = (Patient, Token) => (req, res) => {
  if (Token) {
    Patient.findByIdAndRemove(req.params.patId, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Пациент удален.'})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Подгружаем пациентов из базы по ФИО.
api.getPatientsByFIO = (Patient, Token) => (req, res) => {
  if (Token) {
    if (req.params.lastName || req.params.firstName || req.params.middleName) {
      let val = ''
      if (req.params.lastName !== ' ') {
        val += req.params.lastName + '[А-Я]*'
      } else {
        val += '[А-Я]*'
      }
      if (req.params.firstName !== ' ') {
        val += '\\s+' + req.params.firstName + '[А-Я]*'
      } else {
        val += '\\s+[А-Я]*'
      }
      if (req.params.middleName !== ' ') {
        val += '\\s+' + req.params.middleName + '[А-Я]*'
      } else {
        val += '\\s+[А-Я]*'
      }
      Patient.find({'fio': {$regex: new RegExp(val), $options: 'i'}}, {}, {limit: 20}, (err, patients) => {
        if (err) res.status(400).json(err)
        if (patients.length === 0) {
          res.status(200).json({success: false, message: 'Пациенты не найдены.'})
        } else {
          res.status(200).json({success: true, patients: patients})
        }
      })
    } else {
      res.status(200).json({success: false, message: 'Пустой запрос.'})
    }
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

/**
 * Методы про медосмотры.
 */

//* Ставим на медосмотр.
api.addActiveMedos = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempMedos = req.body.activeMedos
    tempMedos.updatedAt = new Date()
    Patient.findByIdAndUpdate(req.params.patId, {
      $set: {activeMedos: tempMedos, hasActiveMedos: true}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Пациент зарегистрирован на медосмотр.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Убираем с медосмотра.
api.removeActiveMedos = (Patient, Token) => (req, res) => {
  if (Token) {
    Patient.findByIdAndUpdate(req.params.patId, {
      $unset: {activeMedos: true},
      $set: {hasActiveMedos: false}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Пациент снят с медосмотра.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Подгружаем пациентов на медосмотре из базы по ФИО.
api.getMedosPatientsByFIO = (Patient, Token) => (req, res) => {
  if (Token) {
    if (req.params.lastName || req.params.firstName || req.params.middleName) {
      let val = ''
      if (req.params.lastName !== ' ') {
        val += req.params.lastName + '[А-Я]*'
      } else {
        val += '[А-Я]*'
      }
      if (req.params.firstName !== ' ') {
        val += '\\s+' + req.params.firstName + '[А-Я]*'
      } else {
        val += '\\s+[А-Я]*'
      }
      if (req.params.middleName !== ' ') {
        val += '\\s+' + req.params.middleName + '[А-Я]*'
      } else {
        val += '\\s+[А-Я]*'
      }
      Patient.find({'fio': {$regex: new RegExp(val), $options: 'i'}, 'hasActiveMedos': true}, (err, patients) => {
        if (err) res.status(400).json(err)
        if (patients.length === 0) {
          res.status(200).json({success: false, message: 'Пациенты не найдены.'})
        } else {
          res.status(200).json({success: true, patients: patients})
        }
      })
    } else {
      res.status(200).json({success: false, message: 'Пустой запрос.'})
    }
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Редактируем параметры пациента.
api.updatePatientParameters = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempParameters = req.body.medosParameters
    Patient.findByIdAndUpdate(req.params.patId, {
      $set: {'activeMedos.medosParameters': tempParameters}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Данные обновлены.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Редактируем вредности пациента.
api.updatePatientHarms = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempHarms = req.body.medosHarms
    let tempDoctors = req.body.medosDoctors
    let tempExams = req.body.medosExams
    Patient.findByIdAndUpdate(req.params.patId, {
      $set: {
        'activeMedos.medosHarms': tempHarms,
        'activeMedos.medosDoctors': tempDoctors,
        'activeMedos.medosExams': tempExams
      }
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Вредности обновлены.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.addDoctorResult = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempDoctorResult = req.body.doctorResult
    Patient.findByIdAndUpdate(req.params.patId, {
      $push: {'activeMedos.medosDoctorResults': tempDoctorResult}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Осмотр добавлен.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.updateDoctorResult = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempDoctorResult = req.body.doctorResult
    Patient.findOneAndUpdate({
      _id: req.params.patId,
      'activeMedos.medosDoctorResults._id': req.params.resultId
    }, {
      $set: {'activeMedos.medosDoctorResults.$': tempDoctorResult}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Осмотр изменен.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.addFinalResult = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempMedos = req.body.medosResult
    Patient.findByIdAndUpdate(req.params.patId, {
      $push: {'medosArchive': tempMedos},
      $set: {'hasActiveMedos': false},
      $unset: {'activeMedos': true}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Мед. осмотр заархивирован.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.addExamResult = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempExamResult = req.body.examResult
    Patient.findByIdAndUpdate(req.params.patId, {
      $push: {'activeMedos.medosExamResults': tempExamResult}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Обследование добавлено.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.updateExamResult = (Patient, Token) => (req, res) => {
  let tempExamResult = req.body.examResult
  if (Token) {
    Patient.findOneAndUpdate({
      _id: req.params.patId,
      'activeMedos.medosExamResults._id': req.params.examId
    }, {
      $set: {'activeMedos.medosExamResults.$': tempExamResult}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Обследование изменено.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

/**
 * Методы про снимки.
 */

//* Добавляем снимок пациенту.
api.addPatientRgResult = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempRgResult = req.body.rgResult
    tempRgResult.rgDate = api.dateToIso(tempRgResult.rgDate)
    Patient.findByIdAndUpdate(req.params.patId, {
      $push: {rgResults: tempRgResult}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Снимок добавлен.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Удаляем снимок пациенту.
api.removePatientRgResult = (Patient, Token) => (req, res) => {
  if (Token) {
    Patient.findByIdAndUpdate(req.params.patId, {
      $pull: {'rgResults': {_id: req.params.rgId}}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Зарегистрированный снимок удален.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Удаляем снимок пациенту.
api.editPatientRgResult = (Patient, Token) => (req, res) => {
  if (Token) {
    let tempRgResult = req.body.rgResult
    Patient.findOneAndUpdate({
      _id: req.params.patId,
      'rgResults._id': req.params.rgId
    }, {
      $set: {'rgResults.$': tempRgResult}
    }, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Снимок отредактирован.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

/**
 * Методы про анализы.
 */

//* Добавляем анализ пациенту.
api.addPatientAnalyze = (Patient, Token) => (req, res) => {
  if (Token) {
    const analyzeResult = req.body.analyzeResult
    let analyzeArray = ''
    switch (req.body.analyzeType) {
      case 'blood':
        analyzeResult.bloodDate = api.dateToIso(analyzeResult.bloodDate)
        analyzeArray = 'bloodResults'
        break
      case 'urineClinical':
        analyzeResult.urineDate = api.dateToIso(analyzeResult.urineDate)
        analyzeArray = 'urineClinicalResults'
        break
      case 'smear':
        analyzeResult.smearDate = api.dateToIso(analyzeResult.smearDate)
        analyzeArray = 'smearResults'
        break
      case 'rw':
        analyzeResult.rwDate = api.dateToIso(analyzeResult.rwDate)
        analyzeArray = 'rwResults'
        break
    }
    let push = {$push: {}}
    push.$push[analyzeArray] = analyzeResult
    Patient.findByIdAndUpdate(req.params.patId, push, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Анализ добавлен.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Редактируем анализ пациенту.
api.editPatientAnalyze = (Patient, Token) => (req, res) => {
  if (Token) {
    let analyzeResult = req.body.analyzeResult
    switch (req.body.analyzeType) {
      case 'blood':
        analyzeResult.bloodDate = api.dateToIso(analyzeResult.bloodDate)
        Patient.findOneAndUpdate({
          _id: req.params.patId,
          'bloodResults._id': req.params.analyzeId
        }, {
          $set: {
            'bloodResults.$': analyzeResult
          }
        }, {
          new: true
        }, (err, patient) => {
          if (err) res.status(400).json(err)
          if (patient) {
            res.status(200).json({success: true, message: 'Анализ крови изменен.', patient: patient})
          } else {
            res.status(200).json({success: false, message: 'Такой пациент не найден.'})
          }
        })
        break
      case 'urineClinical':
        analyzeResult.urineDate = api.dateToIso(analyzeResult.urineDate)
        Patient.findOneAndUpdate({_id: req.params.patId, 'urineClinicalResults._id': req.params.analyzeId}, {
          $set: {
            'urineClinicalResults.$': analyzeResult
          }
        }, {
          new: true
        }, (err, patient) => {
          if (err) res.status(400).json(err)
          if (patient) {
            res.status(200).json({success: true, message: 'Анализ мочи изменен.', patient: patient})
          } else {
            res.status(200).json({success: false, message: 'Такой пациент не найден.'})
          }
        })
        break
      case 'smear':
        analyzeResult.smearDate = api.dateToIso(analyzeResult.smearDate)
        Patient.findOneAndUpdate({
          _id: req.params.patId,
          'smearResults._id': req.params.analyzeId
        }, {
          $set: {
            'smearResults.$': analyzeResult
          }
        }, {
          new: true
        }, (err, patient) => {
          if (err) res.status(400).json(err)
          if (patient) {
            res.status(200).json({success: true, message: 'Мазок изменен.', patient: patient})
          } else {
            res.status(200).json({success: false, message: 'Такой пациент не найден.'})
          }
        })
        break
      case 'rw':
        analyzeResult.rwDate = api.dateToIso(analyzeResult.rwDate)
        Patient.findOneAndUpdate({
          _id: req.params.patId,
          'rwResults._id': req.params.analyzeId
        }, {
          $set: {
            'rwResults.$': analyzeResult
          }
        }, {
          new: true
        }, (err, patient) => {
          if (err) res.status(400).json(err)
          if (patient) {
            res.status(200).json({success: true, message: 'RW изменен.', patient: patient})
          } else {
            res.status(200).json({success: false, message: 'Такой пациент не найден.'})
          }
        })
        break
    }
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

//* Удаляем анализ пациенту.
api.removePatientAnalyze = (Patient, Token) => (req, res) => {
  if (Token) {
    let analyzeArray = ''
    switch (req.body.analyzeType) {
      case 'blood':
        analyzeArray = 'bloodResults'
        break
      case 'urineClinical':
        analyzeArray = 'urineClinicalResults'
        break
      case 'smear':
        analyzeArray = 'smearResults'
        break
      case 'rw':
        analyzeArray = 'rwResults'
        break
    }
    let pull = {$pull: {}}
    pull.$pull[analyzeArray] = {_id: req.params.analyzeId}
    Patient.findByIdAndUpdate(req.params.patId, pull, {
      new: true
    }, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json({success: true, message: 'Анализ удален.', patient: patient})
      } else {
        res.status(200).json({success: false, message: 'Такой пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

/**
 * Методы про прививки.
 */

api.addVaccine = (Patient, Token) => (req, res) => {
  if (Token) {
    Patient.findByIdAndUpdate(req.body._id, {
      $push: {
        vaccines: req.body.newVaccine
      }
    }, {new: true}, (err, updatedPatient) => {
      if (err) res.status(400).json(err)
      res.status(200).send({success: true, updatedPatient: updatedPatient})
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.getVaccineById = (Patient, Token) => (req, res) => {
  if (Token) {
    Patient.findOne({'vaccines._id': req.params.vacId}, (err, vaccine) => {
      if (err) res.status(400).json(err)
      if (vaccine) {
        res.status(200).json(vaccine.vaccines.id(req.params.vacId))
      } else {
        res.status(400).json({success: false, message: 'Такой прививки не существует.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.updateVaccineById = (Patient, Token) => (req, res) => {
  // if (Token) {
  //   Patient.findOneAndUpdate({'vaccines._id': req.body.vaccine_id}, {
  //     $set: {
  //       'vaccines.$.type': req.body.vaccine_type,
  //       'vaccines.$.content': req.body.vaccine_content
  //     }
  //   }, {new: true}, (err, updatedVaccine) => {
  //     if (err) res.status(400).json(err)
  //     res.status(200).json(updatedVaccine.vaccines.id(req.body.vaccine_id))
  //   })
  // } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.getVaccinesById = (Patient, Token) => (req, res) => {
  if (Token) {
    Patient.findById(req.params.patId, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        if (patient.vaccines.length === 0) {
          res.status(200).json({success: false, message: 'У этого пациента нет прививок.'})
        } else {
          res.status(200).json({success: true, vaccines: patient.vaccines})
        }
      } else {
        res.status(200).json({success: false, message: 'Такого пациента не найдено.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

/**
 * Обработчик ошибок.
 */

api.errorHandler = (res, msg) => {
  res.json({
    success: false,
    message: msg
  })
}

/**
 * Утилитарные методы.
 */

//* Переводим дату из формата dd.mm.yyyy в yyyy-mm-dd.
api.dateToIso = (input) => {
  const inputDate = input
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/
  return inputDate.replace(pattern, '$3-$2-$1')
}

module.exports = api
