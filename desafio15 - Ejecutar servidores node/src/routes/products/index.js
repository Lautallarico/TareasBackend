
import { Router } from 'express'
import { Authentications } from '../../middlewares/index.js'
import { ProductController } from '../../controllers/index.js'


const router = Router()

router.get('/', ProductController.getAll)

router.get('/:id', ProductController.getById)

router.post('/', Authentications.verifyRole, ProductController.createProduct)

router.delete('/:id', ProductController.deleteProduct)



export { router as ProductRouter }