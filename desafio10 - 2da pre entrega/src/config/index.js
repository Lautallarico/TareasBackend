import dotenv from 'dotenv'
dotenv.config()
import { optionMariaDB, optionSQLite } from '../services/index.js'


const CART_FILENAME = 'carts'
const PRODUCTS_FILENAME = 'products'
const MESSAGES_FILENAME = 'messages'
const MARIA_DB = optionMariaDB
const SQL_LITE = optionSQLite

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
        SELECTED_DATABASE: process.env.SELECTED_DB ?? 'database'
    },

    DATABASE: {
        filesystem: {
            CART_FILENAME,
            PRODUCTS_FILENAME,
            MESSAGES_FILENAME
        },
        mongo: {
            url: process.env.MONGO_DB_URL,
            dbName: process.env.MONGO_DB_NAME
        },
        maria: {
            MARIA_DB
        },
        sql_lite: {
            SQL_LITE
        }
    }
}

export { config }