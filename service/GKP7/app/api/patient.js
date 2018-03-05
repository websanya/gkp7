const mongoose = require('mongoose')

const api = {}

api.makePatient = (Patient) => (req, res) => {
  if (!req.body.fio || !req.body.birthDate || !req.body.sex) {
    res.json({
      success: false,
      message: 'Заполнены не все обязательные поля.'
    })
  } else {
    //* Переводим дату из формата dd.mm.yyyy в удобный.
    let inputDate = req.body.birthDate
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/
    let outputDate = new Date(inputDate.replace(pattern, '$3-$2-$1'))

    const patient = new Patient({
      fio: req.body.fio,
      birthDate: outputDate,
      sex: req.body.sex
    })

    patient.save(err => {
      if (err) {
        console.log(err)
        return res.status(400).json({success: false, message: 'Ошибка при создании пациента.'})
      }
      res.json({success: true, message: 'Пациент создан успешно!'})
    })
  }
}

api.getPatientById = (Patient, Token) => (req, res) => {
  if (Token) {
    Patient.findOne({_id: req.query.patient_id}, (err, patient) => {
      if (err) res.status(400).json(err)
      if (patient) {
        res.status(200).json(patient)
      } else {
        res.status(404).json({success: false, message: 'Пациент не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.getPatientByFIO = (Patient, Token) => (req, res) => {
  if (Token) {
    if (req.body.last_name || req.body.first_name || req.body.middle_name) {
      let val = ''
      if (req.body.last_name) {
        val += req.body.last_name + '[А-Я]*'
      } else {
        val += '[А-Я]*'
      }
      if (req.body.first_name) {
        val += '\\s+' + req.body.first_name + '[А-Я]*'
      } else {
        val += '\\s+[А-Я]*'
      }
      if (req.body.middle_name) {
        val += '\\s+' + req.body.middle_name + '[А-Я]*'
      } else {
        val += '\\s+[А-Я]*'
      }
      Patient.find({'fio': {$regex: new RegExp(val), $options: 'i'}}, (err, patients) => {
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

module.exports = api
