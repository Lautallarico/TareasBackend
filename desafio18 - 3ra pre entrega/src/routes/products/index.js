
import { Router } from 'express'
import { Authentications, IncorrectRoute } from '../../middlewares/index.js'
import { ProductController } from '../../controllers/index.js'


const router = Router()

router.get('/', ProductController.getAll)

router.get('/:id', ProductController.getById)

// router.post('/', Authentications.verifyRole, ProductController.createProduct) este esta bien
router.get('/create-product', Authentications.verifyRole, (req, res) => {
    res.render('create-product.hbs')
})
router.post('/create-product', Authentications.verifyRole, ProductController.createProduct)

router.delete('/:id', ProductController.deleteProduct)

router.get('*', IncorrectRoute.errorRoutes)


export { router as ProductRouter }