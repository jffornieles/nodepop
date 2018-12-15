

'use strict';

const fs = require('fs');
const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');

/**
 * Connect to DB
 */
async function connectDB() {
    const db = require('./lib/connectMongoose')
    return db;
}

/**
 * Drop to DB
 */
async function dropDB() {
    console.log('Dropped DB');
    return mongoose.connection.db.dropDatabase();
}

/**
 * Read file
 * @param {Object} file 
 */
function readFile(file) {
    console.log('Read File', file);
    try {
        return fs.readFileSync(file);
    } catch (err) {
        throw new Error(`Error to read file ${file}, ${err}`);
    }    
}

/**
 * Parse file
 * @param {Object} fileReaded 
 */
function parseFile(fileReaded) {
    console.log('Parse file');
    try {
        return JSON.parse(fileReaded);    
    } catch (err) {
        throw new Error(`Error to parse file ${fileReaded}, ${err}`);
    }
}

/**
 * Save DB
 * @param {Object} fileParsed 
 */
async function saveDB(fileParsed) {

    if (fileParsed.anuncios) {
        for (const anuncio of fileParsed.anuncios) {
            let anuncioSave = new Anuncio();
            anuncioSave.nombre = anuncio.nombre;
            anuncioSave.venta = anuncio.venta;
            anuncioSave.precio = anuncio.precio;
            anuncioSave.foto = anuncio.foto;
            anuncioSave.tags = anuncio.tags;
        
            await fileSave(anuncioSave);
        }
    } else {
        for (const usuario of fileParsed.usuarios) {
            let usuarioSave = new Usuario();
            usuarioSave.nombre = usuario.nombre;
            usuarioSave.email = usuario.email;
            usuarioSave.clave = usuario.clave;
        
            await fileSave(usuarioSave);
        }
    }
    console.log('Save file');
    return fileParsed;    
}

/**
 * File save
 * @param {Object} fileSave 
 */
async function fileSave(fileSave) {
    return fileSave.save();    
}



async function main() {
    
    const fileAnuncios = './anuncios.json';
    const fileUsuarios = './usuarios.json';
    let fileReaded;
    let fileParsed;

    await connectDB();
    
    await dropDB();

    /**
     * Reading, parsing and saving Anuncios file
     */
    fileReaded = readFile(fileAnuncios);        
    fileParsed = parseFile(fileReaded);        
    await saveDB(fileParsed);

    /**
     * Reading, parsing and saving Usuarios file
     */
    fileReaded = readFile(fileUsuarios);        
    fileParsed = parseFile(fileReaded);        
    await saveDB(fileParsed);    
    
    return 'Initialized Data Base!!';
    
}

main()
    .then(message => {
        console.log(message); 
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })

