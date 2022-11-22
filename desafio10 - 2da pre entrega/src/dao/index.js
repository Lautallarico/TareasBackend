import { CartsMongo, CartFileSystem } from './Carts/index.js'
import { ProductsMongo, ProductBataBase, ProductFileSystem } from './Products/index.js'
import { MessagesDataBase, MessagesFileSystem } from './Messages/index.js'
import { MongoDBService } from '../services/index.js'
import { config } from '../config/index.js'



const getSelectedDaos = () => {
    switch (config.SERVER.SELECTED_DATABASE) {
        case 'mongo': {
            MongoDBService.init();
            return {
                ProductDao: new ProductsMongo(),
                CartDao: new CartsMongo()
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
                ProductDao: new ProductBataBase(),
                MessageDao: new MessagesDataBase()
            }
        }
    }
}

const { ProductDao, CartDao, MessageDao } = getSelectedDaos();

export { ProductDao, CartDao, MessageDao }