
'use strict'

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

module.exports = { filtroPrecio }
