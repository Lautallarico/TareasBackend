// const express = require('express')
import express from 'express'

// const routerProductos = require('./routes/productos.js')
import { router } from './routes/productos.js'
import { ViewsRouter } from './routes/views-router.js'

// const handlebars = require('express-handlebars')
import handlebars from 'express-handlebars'

const PORT = 8080
const app = express()

//lineas siguientes obligatorias desafio5
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))


app.set('view engine', 'hbs')
app.set('views', './views')


app.use('/', ViewsRouter)
app.use('/api/productos', router)
// app.use('/', express.static('public'))


const server = app.listen(PORT, () => console.log(`Server inicializado en el puerto ${PORT} - DESAFIO 5`))
server.on('error', err => console.log(`Error del servidor: ${err}`))
