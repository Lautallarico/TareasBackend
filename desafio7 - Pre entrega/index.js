
import express from 'express'
import { ProductRouter, CartRouter } from './src/routes/index.js'

import handlebars from 'express-handlebars'

import { DATE_UTILS } from './src/utils/index.js'

import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

import { ProductApi, MessagesApi } from './src/api/index.js'

import { config } from './src/config/index.js'

const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use('/', express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))


app.set('view engine', 'hbs')
app.set('views', './public/views')

app.use('/api/productos', ProductRouter)
app.use('/api/carrito', CartRouter)


httpServer.listen(config.SERVER.PORT, () => console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 7 Pre-entrega 1`))
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

    const newMessage = { ...message, messageSendAt: `Enviado ${DATE_UTILS.getTimestamp()} hs` }
    await MessagesApi.save(newMessage)
    const allMessages = await MessagesApi.getAll()

    io.sockets.emit('all messages', allMessages)
}
const sendAllMessages = async (socket) => {
    const allMessages = await MessagesApi.getAll()
    socket.emit('all messages', allMessages)
}