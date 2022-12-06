import { Router } from 'express'
import { ProductController } from '../../controllers/index.js'

const router = Router()

router.get('/', ProductController.getProductsTest)

export { router as ProductsRouter }