
'use strict'

const express = require('express')
const router = express.Router()

const Anuncio = require('../../models/Anuncio')

/**
 * GET anuncios
 */
router.get('/', (req, res, next) => {
  Anuncio.find().exec((err, anuncios) => {
    if (err) {
      return next(err)
    }

    res.json(anuncios)
  })
})

module.exports = router
