
import Router from 'koa-router'
import { Authentications } from '../../middlewares/index.js'
import { ProductController } from '../../controllers/index.js'


const router = new Router({ prefix: '/api/products' })

router.get('/', ProductController.getAll)
router.post('/create-product', Authentications.verifyRole, ProductController.createProduct)
router.get('/:id', ProductController.getById)
router.delete('/:id', ProductController.deleteProduct)


export { router as ProductRouter }