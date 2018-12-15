

'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {type: String, index: true},
    clave: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);

