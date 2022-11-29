import { CartsMongo, CartFileSystem } from './Carts/index.js'
import { ProductsMongo, ProductDataBase, ProductFileSystem } from './Products/index.js'
import { MessagesDataBase, MessagesFileSystem, ChatMongo, MessageMongo } from './Messages/index.js'
import { MongoDBService } from '../services/index.js'
import { config } from '../config/index.js'



const getSelectedDaos = () => {
    switch (config.SERVER.SELECTED_DATABASE) {
        case 'mongo': {
            MongoDBService.init();
            return {
                ProductDao: new ProductsMongo(),
                CartDao: new CartsMongo(),
                ChatDao: new ChatMongo(),
                MessageDao: new MessageMongo()
            }
        }
        case 'filesystem': {
            return {
                ProductDao: new ProductFileSystem(),
                CartDao: new CartFileSystem(),
                MessageDao: new MessagesFileSystem()
            }
        }
        case 'database': {
            return {
                ProductDao: new ProductDataBase(),
                MessageDao: new MessagesDataBase()
            }
        }
    }
}

const { ProductDao, CartDao, ChatDao, MessageDao } = getSelectedDaos();

export { ProductDao, CartDao, ChatDao, MessageDao }