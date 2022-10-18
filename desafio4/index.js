const routerProductos = require('./routes/productos.js')
const express = require('express')
const { Router } = express
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => console.log(`Server inicializado en el puerto ${PORT} - DESAFIO 4`))
server.on('error', err => console.log(`Error del servidor: ${err}`))

app.use(express.json())

app.use('/api/productos', routerProductos)

app.use('/formulario', express.static('public'))