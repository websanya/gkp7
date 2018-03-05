const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema({
  username: {
    type: 'String',
    unique: true,
    required: true
  },
  password: {
    type: 'String',
    required: true
  },
  fio: {
    type: 'String',
    required: true
  },
  roles: {
    superuser: {
      type: 'Boolean',
      default: false
    },
    medos: {
      reg: {
        type: 'Boolean',
        default: false
      },
      dovr: {
        type: 'Boolean',
        default: false
      },
      ofd: {
        type: 'Boolean',
        default: false
      },
      doctor: {
        type: 'Number',
        default: false
      },
      supervisor: {
        type: 'Boolean',
        default: false
      },
      admin: {
        type: 'Boolean',
        default: false
      }
    },
    fg: {
      reg: {
        type: 'Boolean',
        default: false
      },
      doctor: {
        type: 'Boolean',
        default: false
      },
      supervisor: {
        type: 'Boolean',
        default: false
      },
      admin: {
        type: 'Boolean',
        default: false
      }
    },
    lab: {
      reg: {
        type: 'Boolean',
        default: false
      },
      doctor: {
        type: 'Boolean',
        default: false
      },
      supervisor: {
        type: 'Boolean',
        default: false
      },
      admin: {
        type: 'Boolean',
        default: false
      }
    },
    priv: {
      reg: {
        type: 'Boolean',
        default: false
      },
      doctor: {
        type: 'Boolean',
        default: false
      },
      supervisor: {
        type: 'Boolean',
        default: false
      },
      admin: {
        type: 'Boolean',
        default: false
      }
    },
    vred: {
      supervisor: {
        type: 'Boolean',
        default: false
      },
      admin: {
        type: 'Boolean',
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
