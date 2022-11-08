// const express = require('express')
import express from 'express'

// const routerProductos = require('./routes/productos.js')
import { router } from './routes/productos.js'


const app = express()
const PORT = 8080

const server = app.listen(PORT, () => console.log(`Server inicializado en el puerto ${PORT} - DESAFIO 4`))
server.on('error', err => console.log(`Error del servidor: ${err}`))

app.use(express.json())

app.use('/api/productos', router)

app.use('/', express.static('public'))
