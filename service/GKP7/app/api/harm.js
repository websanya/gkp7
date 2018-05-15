const mongoose = require('mongoose')

const api = {}

//* Вернуть всю базу вредностей.
api.getAllHarms = (Harm, Token) => (req, res) => {
  if (Token) {
    Harm.find({}, {}, {
      sort: {
        harmName: 1
      }
    }, (err, harms) => {
      if (err) res.status(400).json(err)
      if (harms) {
        res.status(200).json({success: true, harms: harms})
      } else {
        res.status(200).json({success: false, message: 'Компаний не найдено.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

module.exports = api
