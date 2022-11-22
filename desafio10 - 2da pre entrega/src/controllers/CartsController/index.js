
import { DATE_UTILS, ERRORS_UTILS } from '../../utils/index.js'
import { CartDao, ProductDao } from '../../dao/index.js'


const saveCart = async (req, res) => {
    const startCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }

    const cart = await CartDao.save(startCart)

    res.send({ success: true, cartId: cart.id })
}

const updatedCartById = async (req, res) => {
    try {
        const { productId } = req.body
        const { cartId } = req.params


        const cart = await CartDao.getById(cartId)
        if (!cart) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        const product = await ProductDao.getById(productId)
        if (!product) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

        cart.products.push(product)

        const updatedCart = await CartDao.updateById(cartId, cart)

        res.send({ success: true, cart: updatedCart })
    } catch (error) {
        console.log(error, `Error desde CartRouter - Post`);
    }
}

const deleteCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.deleteById(cartId)
        if (!cart) return res.send({ success: false, message: DATE_UTILS.MESSAGES.NO_CART })

        res.send({ success: true, data: cart })
    } catch (error) {
        console.log(error, `Error desde CartRouter - Delete`);
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const { cartId } = req.params
        const { id_prod } = req.params

        const cart = await CartDao.getById(cartId)
        if (!cart) { res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART }) }
        else {
            const product = await ProductDao.getById(id_prod)
            if (!product) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

            const foundElementIndex = cart.productos.findIndex(element => element.id == id_prod)

            if (foundElementIndex === -1) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })
            cart.productos.splice(foundElementIndex, 1)

            res.send({ success: true, message: `Se elimino del carrito ${cartId} el producto con el ID ${id_prod}` })
        }

        const updatedCart = await CartDao.updateById(cartId, cart)
        res.send({ success: true, cart: updatedCart })

    } catch (error) {
        console.log(error, `Error desde CartRouter - Delete CartID/IDprod`);
    }
}

const productsInCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.getById(cartId)
        if (!cart) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        const productsInCart = await cart.products

        res.send({ success: true, productsInCart: productsInCart })

    } catch (error) {
        console.log(error, `Error desde CartRouter - Get`);
    }

}

const cartById = async (req, res) => {
    const { id } = req.params

    const cart = await CartDao.getById(id)

    res.send({ success: true, cart })
}

export const CartController = { saveCart, updatedCartById, deleteCart, deleteProductFromCart, productsInCart, cartById }