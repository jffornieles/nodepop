
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

anuncioSchema.statics.getTags = () => {
  return { tags: tagsValidos }
}

module.exports = mongoose.model('Anuncio', anuncioSchema)
