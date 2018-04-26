const mongoose = require('mongoose')

const api = {}

api.createUser = (User, Token) => (req, res) => {
  let isSuperUser = req.body.isSuperUser
  let isAdmin = req.body.isAdmin
  let roles = req.body.roles

  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      message: 'Заполнены не все обязательные поля.'
    })
  } else {
    let user = new User({
      username: req.body.username,
      password: req.body.password,
      fio: req.body.fio
    })

    if (isAdmin) {
      user.roles.superuser = true
    } else if (isSuperUser) {
      user.roles = {
        medos: {
          admin: true
        },
        radiography: {
          admin: true
        },
        laboratory: {
          admin: true
        },
        vaccination: {
          admin: true
        }
      }
    } else {
      user.roles = roles
    }

    user.save(error => {
      if (error) return res.status(400).json({success: false, message: 'Имя пользователя уже существует.'})
      res.json({success: true, message: 'Учетная запись создана успешно!'})
    })
  }
}

api.getUserById = (User, Token) => (req, res) => {
  if (Token) {
    User.findOne({_id: req.query.user_id}, (err, user) => {
      if (err) res.status(400).json(err)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).send({success: false, message: 'Пользователь не найден.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

api.getAll = (User, Token) => (req, res) => {
  if (Token) {
    User.findOne({_id: req.query.user_id}, (err, user) => {
      if (err) res.status(400).json(err)
      if (user && user.roles.superuser) {
        User.find({}, (err, users) => {
          if (err) res.status(400).json(err)
          res.status(200).json(users)
        })
      } else {
        res.status(400).json({success: false, message: 'Нет админского доступа.'})
      }
    })
  } else return res.status(403).send({success: false, message: 'Нет доступа.'})
}

module.exports = api
