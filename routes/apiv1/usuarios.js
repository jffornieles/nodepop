
'use strict'

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const i18n = require('i18n')
const Usuario = require('../../models/Usuario')

/**
 * Capturamos idioma y configuramos la librería i18n
 * @param {*} req
 * @param {*} res
 */
function i18nConfigure (req, res) {
  const lang = req.query.lang || req.body.lang || 'es'
  i18n.setLocale(res, lang)
}

/**
 * POST /usuarios
 */
router.post('/', async (req, res, next) => {
  i18nConfigure(req, res)

  try {
    if (!req.body.nombre) {
      res.json({ succes: false, error: res.__('ERR_NAME') })
      return
    }

    if (!req.body.email) {
      res.json({ succes: false, error: res.__('ERR_EMAIL') })
      return
    }

    if (!req.body.clave) {
      res.json({ succes: false, error: res.__('ERR_PASS') })
      return
    }

    const usuario = new Usuario({
      nombre: req.body.nombre,
      email: req.body.email,
      clave: req.body.clave
    })

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
  i18nConfigure(req, res)

  try {
    const email = req.body.email
    const password = req.body.clave

    const usuario = await Usuario.findOne({ email: email }).exec()
    if (!usuario) {
      res.json({ succes: false, error: res.__('ERR_INV_CRE') })
      return
    }

    const igualPassword = await Usuario.bcryptCompare(password, usuario.clave)
    if (!igualPassword) {
      res.json({ succes: false, error: res.__('ERR_INV_CRE') })
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
