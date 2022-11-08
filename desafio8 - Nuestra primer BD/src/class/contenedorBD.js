import knex from 'knex'
const knexService = knex()

class ContenedorBD {

    constructor(config) {
        this.knex = knexService(config)

    }

    async createTableMessages() {

        try {

            await this.knex.schema.createTable('messages', table => {
                table.increments('id');
                table.string('message');
                table.timestamp('messageSendAt');
            })
            console.log(`The table messages has been created`);

        } catch (error) {

            console.log(`El error está en el createTableMessages - error: ${error}`);
        }
    }

    async saveMessage(text) {
        try {
            const newMessage = {
                message: text.message,
                messageSendAt: text.message
            }

            await insertMessage(newMessage)
            return newMessage

        } catch (error) {
            console.log(`El error está en el saveProduct - error: ${error}`);
        }
    }

    async insertMessage(message) {
        try {
            await this.knex('messages').insert(message)
        } catch (error) {
            console.log(`El error está en el insertMessage - error: ${error}`);
        }

    }

    async getAllMessages() {
        try {
            const listAllMessages = await this.knex('messages').select('*')
            return listAllMessages
        } catch (error) {
            console.log(`El error está en el allMessages - error: ${error}`);
        }
    }

    async createTableProducts() {

        try {

            await this.knex.schema.createTable('products', table => {
                table.increments('id');
                table.string('title');
                table.decimal('price');
                table.string('thumbnail');
                table.string('code');
                table.string('description');
                table.float('stock');
                table.timestamp('messageSendAt');
            })
            console.log(`The table products has been created`);

        } catch (error) {

            console.log(`El error está en el createTableProducts - error: ${error}`);
        }
    }

    async saveProduct(product) {
        try {
            const newProduct = {
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                description: product.description,
                stock: product.stock,
            }

            await insertProduct(newProduct)
            return newProduct

        } catch (error) {
            console.log(`El error está en el saveProduct - error: ${error}`);
        }
    }

    async insertProduct(product) {
        try {
            await this.knex('products').insert(product)
        } catch (error) {
            console.log(`El error está en el insertProduct - error: ${error}`);
        }

    }

    async getAllProducts() {
        try {
            const listAllProducts = await this.knex('products').select('*')
            return listAllProducts
        } catch (error) {
            console.log(`El error está en el allProucts - error: ${error}`);
        }
    }
}

export { ContenedorBD }