

'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);

