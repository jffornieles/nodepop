
'use strict';

const express = require('express');
const router = express.Router();

const Usuario = require('../../models/Usuario');

/**
 * GET usuarios
 */
router.get('/', (req, res, next) => {

    Usuario.find().exec((err, usuarios) => {
        if (err) {
            return next(err);
        }

        res.json(usuarios);
    });
    
});


module.exports = router;