// const express = require('express')
import express from 'express'

// const routerProductos = require('./routes/productos.js')
import { router } from './routes/productos.js'
import { ViewsRouter } from './routes/views-router.js'

// const handlebars = require('express-handlebars')
import handlebars from 'express-handlebars'

// const dayjs = require('dayjs')
import dayjs from 'dayjs'
// const  customParseFormat = require('dayjs/plugin/customParseFormat')
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

// const { Server: HttpServer } = require('http')
import { Server as HttpServer } from 'http'
// const { Server: SocketIOServer } = require('socket.io')
import { Server as IOServer } from 'socket.io'

import { ProductApi } from './api/product-api.js'
import { MessagesApi } from './api/messages-api.js'

const PORT = 8080
const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//lineas siguientes obligatorias desafio5
app.use('/', express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))


app.set('view engine', 'hbs')
app.set('views', './public/views')


app.use('/', ViewsRouter)
app.use('/api/productos', router)





// const server = app.listen(PORT, () => console.log(`Server inicializado en el puerto ${PORT} - DESAFIO 5`))
// server.on('error', err => console.log(`Error del servidor: ${err}`))

// El servidor funcionando en el puerto PORT
httpServer.listen(PORT, () => console.log(`Server inicializado en el puerto ${PORT} - Desafio 6 websockets`))
httpServer.on('error', error => console.log(`Error del servidor: ${error}`))


// SOCKETS PRODUCTOS
io.on('connection', async socket => {
    await sendAllProducts(socket)
    await sendAllMessages(socket)

    socket.on('new product', async product => {
        await saveProduct(product)
    })

    socket.on('new message', async message => {
        await saveMessage(message)
    })
})

const sendAllProducts = async (socket) => {
    const allProducts = await ProductApi.getAll()
    socket.emit('all products', allProducts)
}
const saveProduct = async newProduct => {
    await ProductApi.save(newProduct)
    const allProducts = await ProductApi.getAll()
    io.sockets.emit('all products', allProducts)
}

// SOCKETS CHAT

const saveMessage = async (message) => {
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')

    const newMessage = { ...message, messageSendAt: `Enviado ${dateFormated} hs` }
    await MessagesApi.save(newMessage)
    const allMessages = await MessagesApi.getAll()

    io.sockets.emit('all messages', allMessages)
}

const sendAllMessages = async (socket) => {
    const allMessages = await MessagesApi.getAll()
    socket.emit('all messages', allMessages)
}