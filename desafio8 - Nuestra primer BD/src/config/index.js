import dotenv from 'dotenv'
dotenv.config()

const CART_FILENAME = 'carts'
const PRODUCTS_FILENAME = 'productos'
const MESSAGES_FILENAME = 'messages'

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080
    },
    DATABASE: {
        filesystem:{
            CART_FILENAME,
            PRODUCTS_FILENAME,
            MESSAGES_FILENAME
        }

    }
}

export { config }