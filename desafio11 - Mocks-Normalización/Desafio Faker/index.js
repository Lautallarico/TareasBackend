
import express from 'express'
import { ProductRouter, CartRouter, ProductsTestRouter, MessagesRouter } from './src/routes/index.js'

import handlebars from 'express-handlebars'

import { config } from './src/config/index.js'

const app = express()

app.use('/', express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))

app.set('view engine', 'hbs')
app.set('views', './public/views')

app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/products-test', ProductsTestRouter)
app.use('/api/messages', MessagesRouter)


app.listen(config.SERVER.PORT, () => console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 11 - Mocks/Normalización`))
app.on('error', error => console.log(`Error del servidor: ${error}`))
