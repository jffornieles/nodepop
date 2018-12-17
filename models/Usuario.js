

'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    email: {type: String, index: true, required: true},
    clave: {type: String, required: true}
});

module.exports = mongoose.model('Usuario', usuarioSchema);

