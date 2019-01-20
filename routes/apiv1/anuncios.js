
'use strict'

const express = require('express')
const router = express.Router()

const Anuncio = require('../../models/Anuncio')

const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware')

const { filtroPrecio } = require('../../lib/utils')

router.use(jwtAuthMiddleware())

/**
 * GET /anuncios
 */
router.get('/', async (req, res, next) => {
  try {
    const venta = req.query.venta
    const nombre = req.query.nombre
    const precio = req.query.precio
    const sort = req.query.sort
    const tags = req.query.tags
    const limit = parseInt(req.query.limit)
    const start = parseInt(req.query.start)
    const filter = {}
    const fields = 'tags nombre venta precio foto'

    if (tags) {
      filter.tags = { '$in': tags }
    }
    if (venta) {
      filter.venta = venta
    }
    if (nombre) {
      filter.nombre = new RegExp('^' + nombre, 'i')
    }
    if (precio) {
      filter.precio = filtroPrecio(precio)
    }

    const query = Anuncio.find(filter)
    query.sort(sort)
    query.skip(start)
    query.limit(limit)
    query.select(fields)
    const anuncios = await query.exec()

    res.json({ success: true, anuncios: anuncios })
  } catch (err) {
    return next(err)
  }
})

/**
 * GET /anuncios/tags
 * Obtenemos los tags válidos
 */
router.get('/tags', async (req, res, next) => {
  try {
    const tags = await Anuncio.getTags()
    res.json({
      success: true,
      result: tags
    })
  } catch (err) {
    next(err)
  }
})

/**
 * GET /anuncios/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const anuncio = await Anuncio.findById({ _id: id }).exec()

    res.json({ succes: true, anuncio: anuncio })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
