
'use strict'

const express = require('express')
const router = express.Router()

const Anuncio = require('../../models/Anuncio')

const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware')

router.use(jwtAuthMiddleware())

/**
 * Obtenemos las distintas combinaciones para filtrar por precio:
 * xx-xx -> buscaremos por precio entre ambos valores.
 * xx-   -> buscaremos por precio mayor o igual a xx
 * -xx   -> buscaremos por precio menor o igual a xx
 * xx    -> buscaremos por precio igual a xx
 * @param {Strig} precio
 */
function filtroPrecio (precio) {
  const precioArray = precio.split('-')
  const precioDesde = precioArray[0]
  const precioHasta = precioArray[1]
  const formatoPrecio1 = /[0-9]+-{1}[0-9]+$/ // xx-xx
  const formatoPrecio2 = /[0-9]+-$/ // xx-
  const formatoPrecio3 = /^-[0-9]+$/ // -xx
  const formatoPrecio4 = /^[0-9]+$/ // xx

  if (formatoPrecio1.test(precio)) {
    console.log('formato 1 correcto', precio)
    return { '$gte': parseInt(precioDesde), '$lte': parseInt(precioHasta) }
  }
  if (formatoPrecio2.test(precio)) {
    console.log('formato 2 correcto', precio)
    return { '$gte': parseInt(precioDesde) }
  }
  if (formatoPrecio3.test(precio)) {
    console.log('formato 3 correcto', precio)
    return { '$lte': parseInt(precioHasta) }
  }
  if (formatoPrecio4.test(precio)) {
    console.log('formato 4 correcto', precio)
    return parseInt(precio)
  }

  // Si llegamos a este punto es que el formato no es correcto
  // por lo que buscamos por precio mayor o igual a cero para que muestre
  // todos los anuncios
  console.log('Formato incorrecto!!', precio)
  return { '$gte': 0 }
}

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
router.get('/tags', (req, res, next) => {
  res.json(Anuncio.getTags())
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
