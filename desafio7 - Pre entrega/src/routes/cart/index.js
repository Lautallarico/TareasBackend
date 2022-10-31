import { Router } from "express"
import { DATE_UTILS, ERRORS_UTILS } from '../../utils/index.js'
import { CartApi, ProductApi } from '../../api/index.js'

const router = Router()

router.post('/', async (req, res) => {
    const startCart = { timestamp: DATE_UTILS.getTimestamp(), productos: [] }

    const cart = await CartApi.save(startCart)

    res.send({ success: true, cartId: cart.id })
})

router.post('/:cartId/productos', async (req, res) => {
    try {
        const { productId } = req.body
        const { cartId } = req.params


        const cart = await CartApi.getById(Number(cartId))
        if (!cart) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        const product = await ProductApi.getById(Number(productId))
        if (!product) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

        cart.productos.push(product)

        const updatedCart = await CartApi.updateById(Number(cartId), cart)

        res.send({ success: true, cart: updatedCart })
    } catch (error) {
        console.log(error, `Error desde CartRouter - Post`);
    }
})

router.delete('/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartApi.deleteById(Number(cartId))
        if (!cart) return res.send({ success: false, message: DATE_UTILS.MESSAGES.NO_CART })

        res.send({ success: true, data: cart })
    } catch (error) {
        console.log(error, `Error desde CartRouter - Delete`);
    }
})

router.delete('/:cartId/productos/:id_prod', async (req, res) => {
    try {
        const { cartId } = req.params
        const { id_prod } = req.params

        const carts = await CartApi.getAll()
        const cart = await CartApi.getById(Number(cartId))
        if (!cart) { res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART }) }
        else {
            const product = await ProductApi.getById(Number(id_prod))
            if (!product) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

            const foundElementIndex = cart.productos.findIndex(element => element.id == id_prod)

            if (foundElementIndex === -1) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
            cart.productos.splice(foundElementIndex, 1)

            res.send({ success: true, message: `Se elimino del carrito ${cartId} el producto con el ID ${id_prod}` })

        }
        console.log(cart);
        // hasta aca logro hacer que el carrito se quede sin el producto pero no lo puedo actualizar en la bd
        return cart

    } catch (error) {
        console.log(error, `Error desde CartRouter - Delete CartID/IDprod`);
    }
})

router.get('/:cartId/productos', async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartApi.getById(Number(cartId))
        if (!cart) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        const productsInCart = await cart.productos

        res.send({ success: true, productsInCart: productsInCart })

    } catch (error) {
        console.log(error, `Error desde CartRouter - Get`);
    }

})

export { router as CartRouter }