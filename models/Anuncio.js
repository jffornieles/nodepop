
'use strict'

const mongoose = require('mongoose')
const tagsValidos = ['work', 'lifestyle', 'motor', 'mobile']

const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  venta: { type: Boolean, index: true },
  precio: { type: Number, index: true },
  foto: String,
  tags: { type: [String], enum: tagsValidos, index: true }
})

anuncioSchema.statics.getTags = function () {
  const query = Anuncio.distinct('tags')
  return query.exec()
}
const Anuncio = mongoose.model('Anuncio', anuncioSchema)
module.exports = Anuncio
