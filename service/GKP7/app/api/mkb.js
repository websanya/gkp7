const mongoose = require('mongoose')

const api = {}

//* Вернуть всю базу диагнозов.
api.getAllMkbs = (Mkb, Token) => (req, res) => {
  if (Token) {
    Mkb.find({}, {}, {
      sort: {
        mkbCode: 1
      }
    }, (err, mkbs) => {
      if (err) res.status(400).json(err)
      if (mkbs) {
        res.status(200).json({success: true, mkbs: mkbs})
      } else {
        res.status(200).json({success: false, message: 'Диагнозы не найдено.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

module.exports = api
