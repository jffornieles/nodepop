
'use strict'

const mongoose = require('mongoose')

mongoose.connection.on('error', (err) => {
  console.log('Conection error ', err)
  process.exit(1)
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })

module.exports = mongoose.connection
