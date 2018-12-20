
'use strict'

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Usuario = require('../../models/Usuario')

/**
 * POST /usuarios
 */
router.post('/', async (req, res, next) => {
  try {
    const usuario = new Usuario()
    usuario.nombre = req.body.nombre
    usuario.email = req.body.email
    usuario.clave = req.body.password

    const usuarioSaved = await usuario.save()
    res.json({ succes: true, usuario: usuarioSaved })
  } catch (err) {
    return next(err)
  }
})

/**
 * POST /usuarios/authenticate
 * Autentica un usuario
 */

router.post('/authenticate', async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const usuario = await Usuario.findOne({ email: email }).exec()

    if (!usuario) {
      res.json({ succes: false, error: 'Invalid credentials' })
      return
    }
    if (password !== usuario.clave) {
      res.json({ succes: false, error: 'Invalid credentials' })
      return
    }

    jwt.sign({ user_id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    }, (err, token) => {
      if (err) {
        return next(err)
      }
      res.json({ succes: true, result: token })
    })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
