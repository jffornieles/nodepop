
# NODEPOP

**Nodepop** es una app de venta de artículos de segunda mano, proporciona anuncios con información sobre articulos a los usuarios que estén autenticados. 

**Operaciones que realiza el API en su primera versión**:
- Registro (nombre, email, contraseña). 
- Autenticación (email y contraseña). El acceso al API se hará con autenticación, usando JWT (JSON Web Token)
- Consulta de anuncios paginada para usuarios autenticados. Con filtros por tag, tipo de anuncio (venta o búsqueda), rango de precio (preciomínimo y precio máximo) y nombre de artículo (que comience por el dato buscado)
- Consulta de tags existentes

## Práctica DevOps
Para la evaluación de esta práctica se puede acceder a las siguientes direcciones:

**<https://www.jffornieles.tk>**  
Accederá a la web estática hecha a partir de una plantilla de [Start Bootstrap](https://startbootstrap.com).

**<https://nodepop.jffornieles.tk>**  
En esta URL está desplegada la app Nodepop, en concreto en las URLs:
- https://nodepop.jffornieles.tk/apiv1/anuncios
- https://nodepop.jffornieles.tk/apiv1/anuncios/tags
- https://nodepop.jffornieles.tk/apiv1/usuarios
- https://nodepop.jffornieles.tk/apiv1/usuarios/athenticate  

Para más información sobre los métodos GET y POST se puede acceder a la siguiente URL donde se encuentra la documentación elaborada con Postman:  
https://documenter.getpostman.com/view/5941716/RzthQrAG

Para comprobar que **nginx** sirve los estáticos gracias a la cabecera personalizada **`X-Owner: jffornieles`** se puede acceder a alguna de las siguientes URLs:  
**https://nodepop.jffornieles.tk/images/anuncios/ipadpro.jpeg** 
**https://nodepop.jffornieles.tk/images/anuncios/ps4.jpeg**




## Internacionalización
Se debe especificar el idioma del usuario en cada petición (se captura de `Accept-Language`). La API devolverá traducidos los mensajes de errror que debe mostrar al usuario en su idioma (solo disponible en esta primera versión en inglés y español). Si no se especifica el idioma, por defecto se establecerá el español. 

# <a id="index"></a>Índice:

1. [Instalación](#instalacion)
2. [Clonar repositorio e instalar dependencias](#clonar)
3. [Inicialización de la base de datos](#iniciobd)
4. [Especificar las variables de entorno](#variablesentorno)
5. [Modelo de datos](#modelodatos)
6. [Entornos de ejecución](#entornosejecucion)
7. [Guia de estilo](#estilo)


## <a id="instalacion"></a>Instalación.
Para realizar la instalación es conveniente disponer del siguiente software:

![NPM version](https://img.shields.io/badge/npm-6.4.1-red.svg)
Tener instalado [npm](https://www.npmjs.com/) en esta versión o superiores.

![NODE version](https://img.shields.io/badge/node-10.13.0-green.svg)
Tener instalado [Node.js](https://nodejs.org/) en esta versión o superiores.

![MONGODB version](https://img.shields.io/badge/mongodb-4.0.4-green.svg)
Tener instalado el motor de base de datos [mongoDB](https://www.mongodb.com/) y que **esté arrancado**.

## <a id="clonar"></a>Clonar repositorio e instalar dependencias
Descargar este repositorio o clonarlo desde `git` .
Una vez clonado, instalar las dependencias con **npm**. Desde línea de comandos:

```shell
$ cd nodepop
nodepop/$ npm install
```
> Para más información sobre los paquetes requeridos para esta aplicación consultar el fichero [package.json](package.json).


## <a id="iniciobd"></a>Inicialización de la base de datos.
Desde un terminal, y una vez arrancado el servidor de `mongodb`, en el directorio raiz del proyecto ejecutar:

```bash
nodepop/$ npm run installDB
```
Al ejecutar este comando:

- Se creará la base de datos **nodepop** en `mongoDB`.
- Se crearán las colecciones de **anuncios** y **usuarios** con datos de muestra.

Si ya se ha creado con anterioridad la base de datos **nodepop** con ambas colecciones, esta ejecución borrará todos los documentos de **anuncios** y **usuarios** y los volverá a cargar con los datos de muestra.

> **Nota**: los datos de muestra están en los ficheros [`anuncios.json`](./anuncios.json) y [`usuarios.json`](./usuarios.json) respectivamente. Se pueden modificar ambos ficheros para añadir/quitar documentos tanto de anuncios como de usuarios, siempre que se respete la estructura que dicta el modelo.


## <a id="variablesentorno"></a>Especificar las variables de entorno
En el directorio de la aplicación se puede encontrar un fichero `.env.example`. **Renombrar dicho fichero a `.env`** y configurar las *variables de entorno* con los valores que utilizará la aplicación.

## <a id="modelodatos"></a>Modelo de datos.
La base de datos `mongoDB` en la que se alojará la información de la API seguirá el modelo de datos para las colecciones:

* `anuncios`
* `usuarios`

### anuncios
Esta colección obedecerá al siguiente modelo:

```
{
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}
```
Los tags válidos serán los siguientes:

* work
* lifestyle
* motor
* mobile

En esta colección se han definido los siguientes índices, ya que será por los que se realizarán las consultas:

* nombre
* venta
* precio
* tags

### usuarios
Para la colección de **usuarios** el modelo es:

```
{
    nombre: String,
    email: String,
    clave: String
}
```

Para la colección **usuarios** se ha definido un índice por el campo `email`.


## <a id="entornosejecucion"></a>Entornos de ejecución.
La API se podrá arrancar en los siguientes entornos:

### Entorno de producción sin cluster.
Ejecutar en línea de comandos desde el directorio de la aplicación:

```shell
nodepop/$ npm run start
```

### Entorno de producción con cluster.
Ejecutar en línea de comandos desde el directorio de la aplicación:

```shell
nodepop/$ npm run cluster
```


## <a id="estilo"></a>Guia de estilo 

Para la revisión de estilo de código y de posibles bugs utilizaremos [ESLint](http://eslint.org/).
En su configuración se ha optado por la versión de JavaScript Standard (revisar fichero `.eslintrc.js`).

Se ha añadido al directorio raiz del proeycto el archivo `.eslintignore`. En este archivo podemos añadir los directorios o archivos de nuestro proyecto para los que no queramos revisión de estilo.

En muchos IDEs existen plugins que lo integran , por ejemplo en [Visual Code existe este para ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) que tras instalarlo y añadir un proyecto con la configuración que queramos podemos ver que nos muestra los errores sobre cada una de las líneas.



