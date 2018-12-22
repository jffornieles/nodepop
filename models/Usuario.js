
'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, requiered: true, index: true },
  clave: { type: String, requiered: true }
})

usuarioSchema.pre('save', function (next) {
  let usuario = this

  bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(usuario.clave, salt, null, (err, hash) => {
      if (err) {
        return next(err)
      }
      usuario.clave = hash
      next()
    })
  })
})

usuarioSchema.statics.bcryptCompare = (passwordIntroducido, passwordLeido) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordIntroducido, passwordLeido, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = mongoose.model('Usuario', usuarioSchema)
