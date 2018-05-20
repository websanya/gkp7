/**
 * doctor:
 * 1 - терапевт
 * 2 - оториноларинголог
 * 3 - дерматовенеролог
 * 4 - офтальмолог
 * 5 - хирург
 * 6 - невролог
 * 7 - стоматолог
 * * 8 - онколог
 * * 9 - уролог
 * * 10 - аллерголог
 * * 11 - эндокринолог
 * 12 - гинеколог
 * 13 - психиатр
 * 14 - нарколог
 *
 * exam:
 * 1 - ОФД (спиро, экг)
 * 2 - Аудиометрист
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fio: {
    type: String,
    required: true
  },
  roles: {
    superuser: {
      type: Boolean,
      default: false
    },
    medos: {
      receptionist: {
        type: Boolean,
        default: false
      },
      premedical: {
        type: Boolean,
        default: false
      },
      doctor: {
        type: Number,
        default: 0
      },
      exam: {
        type: Number,
        default: 0
      },
      admin: {
        type: Boolean,
        default: false
      }
    },
    radiography: {
      assistant: {
        type: Boolean,
        default: false
      },
      admin: {
        type: Boolean,
        default: false
      }
    },
    laboratory: {
      assistant: {
        type: Boolean,
        default: false
      },
      admin: {
        type: Boolean,
        default: false
      }
    },
    vaccination: {
      assistant: {
        type: Boolean,
        default: false
      },
      admin: {
        type: Boolean,
        default: false
      }
    }
  }
})

Schema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error)
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) return next(error)
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

Schema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error)
    callback(null, matches)
  })
}

mongoose.model('User', Schema)
