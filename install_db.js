

'use strict';

const fs = require('fs');
const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');


/**
 * Read file
 * @param {Object} file 
 */
function readFile(file) {

    return new Promise((resolve, reject) => {
        fs.readFile(file,'utf8', (err, data) => {
            if (err) {
                reject(new Error(`Error to read file ${file}, ${err}`));
            }
            resolve();
        });
    });
}

/**
 * Parse file
 * @param {Object} fileReaded 
 */
function parseFile(fileReaded) {

    return new Promise((resolve, reject) => {
        if (!fileReaded) {
            reject (new Error(`Error to parse file ${err}`));
        }
        resolve(JSON.parse(fileReaded));
    });
}

/**
 * 
 * @param {Object} fileParsed 
 * @param {String} model 
 */
function saveDB(fileParsed, model) {

    return new Promise((resolve, reject) => {
        
        const datos = fileParsed[model];
        
        if (datos.length === 0){
            reject (new Error(`Sin datos para ${model}`));
        }

        if (fileParsed.anuncios) {
            for (const anuncio of fileParsed.anuncios) {
                let anuncioSave = new Anuncio();
                anuncioSave.nombre = anuncio.nombre;
                anuncioSave.venta = anuncio.venta;
                anuncioSave.precio = anuncio.precio;
                anuncioSave.foto = anuncio.foto;
                anuncioSave.tags = anuncio.tags;
                anuncioSave.save((err, data) => {
                    if (err) {
                        reject(error);
                    }
                    resolve();
                });      
            }
        } else {
            for (const usuario of fileParsed.usuarios) {
                let usuarioSave = new Usuario();
                usuarioSave.nombre = usuario.nombre;
                usuarioSave.email = usuario.email;
                usuarioSave.clave = usuario.clave;
                usuarioSave.save((err, data) => {
                    if (err) {
                        reject(error);
                    }
                    resolve();
                });      
            }
        }
    });  
}


/**
 * Main function
 */
async function main() {
    
    const fileAnuncios = './anuncios.json';
    const fileUsuarios = './usuarios.json';
    let fileReaded;
    let fileParsed;

    try {
        // Connect to DB
        await require('./lib/connectMongoose');
        console.log('Connect to DB......................Ok');

        // Drop to DB
        await mongoose.connection.db.dropDatabase();
        console.log('Drop DB............................OK');

        
        // Reading, parsing and saving Anuncios file         
        console.log('---- Reading, parsing and saving Anuncios file ----');
        fileReaded = await readFile(fileAnuncios);
        console.log(`File ${fileAnuncios} readed........Ok`);        
        fileParsed = await parseFile(fileReaded);        
        console.log(`File ${fileAnuncios} parsed........Ok`);        
        await saveDB(fileParsed, 'anuncios');
        console.log(`File ${fileAnuncios} saved.........Ok`);        

        
        // Reading, parsing and saving Usuarios file
        console.log('---- Reading, parsing and saving Usuarios file ----');
        fileReaded = await readFile(fileUsuarios);        
        console.log(`File ${fileUsuarios} readed........Ok`);
        fileParsed = await parseFile(fileReaded);        
        console.log(`File ${fileUsuarios} parsed........Ok`);
        await saveDB(fileParsed, 'usuarios');    
        console.log(`File ${fileUsuarios} saved.........Ok`);

        console.log('Initialized Data Base!!!!'); 
        process.exit(0);
        
    } catch (err) {
        console.log('Error:',err);
        process.exit(1);
    }
    
}

main();

