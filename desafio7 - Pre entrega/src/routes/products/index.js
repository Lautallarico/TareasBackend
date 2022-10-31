
import { Router } from 'express'
import { ProductApi } from '../../api/product-api.js'
import { verifyRole } from '../../middlewares/index.js'
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from '../../utils/index.js'

const router = Router()



router.get('/', async (req, res) => {
    const allProducts = await ProductApi.getAll()
    res.send({ success: true, data: allProducts })
})


router.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = await ProductApi.getById(Number(id))
    if (!product) {
        return res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
    }
    res.send({ success: true, data: product })
})


router.post('/', verifyRole, async (req, res) => {
    try {
        const { title, description, code, price, thumbnail, stock } = req.body
    
        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, price, thumbnail, stock, timestamp: DATE_UTILS.getTimestamp(), })

        const savedProduct = await ProductApi.save(product)

        res.send(savedProduct)

    } catch (error) {
        console.log(error, `Error desde ProductRouter - Post`);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductApi.deleteById(Number(id))

        if (!product) {
            return res.send({ success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
        }

        res.send({ success: true, data: product })
    } catch (error) {
        console.log(error, `Error desde ProductRouter - delete`);
    }

})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    const updatedProduct = products.updateById(id, { title, price, thumbnail });

    res.send({ success: true, data: { updated: updatedProduct } });
})



export { router as ProductRouter }