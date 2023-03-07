
import { DATE_UTILS, EMAIL_UTILS, ERRORS_UTILS } from '../../utils/index.js'
import { CartDao, ProductDao } from '../../dao/index.js'
import logger from '../../loggers/loggers.js'
import { SEND_WHATSAPP } from '../../utils/whatsapp.js'
import { config } from '../../config/index.js'


const saveCart = async ctx => {
    try {

        const startCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }
        const cart = await CartDao.save(startCart)
        ctx.body = { success: true, cartId: cart.id }

    } catch (error) {
        console.log(error, `error from saveCart`);
        logger.error('error desde el saveCart')
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART }
    }
}

const updatedCartById = async ctx => {
    try {
        const { productId } = ctx.body
        const { cartId } = ctx.params


        const cart = await CartDao.getById(cartId)
        if (!cart) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART })

        const product = await ProductDao.getById(productId)
        if (!product) return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT })

        cart.products.push(product)

        const updatedCart = await CartDao.updateById(cartId, cart)

        ctx.body = { success: true, cart: updatedCart }
    } catch (error) {
        console.log(error, `error from updatedCartById`);
        logger.error('error desde el updatedCartById')
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART }
    }
}

const deleteCart = async ctx => {
    try {
        const { cartId } = ctx.params

        const cart = await CartDao.deleteById(cartId)
        if (!cart) return res.send({ success: false, message: DATE_UTILS.MESSAGES.NO_CART })

        ctx.body = { success: true, data: cart }
    } catch (error) {
        console.log(error, `error from deleteCart`);
        logger.error('error desde el deleteCart')
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART }
    }
}

const deleteProductFromCart = async ctx => {
    try {
        const { cartId } = ctx.params
        const { id_prod } = ctx.params

        const cart = await CartDao.getById(cartId)
        if (!cart) { ctx.body = { error: true, message: ERRORS_UTILS.MESSAGES.NO_CART } }
        else {
            const product = await ProductDao.getById(id_prod)
            if (!product) return ctx.body = { error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
            const foundElementIndex = cart.products.findIndex(element => element.id == id_prod)

            if (foundElementIndex === -1) return ctx.body = { error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
            cart.products.splice(foundElementIndex, 1)

            ctx.body = { success: true, message: `Se elimino del carrito ${cartId} el producto con el ID ${id_prod}` }
        }

        const updatedCart = await CartDao.updateById(cartId, cart)
        ctx.body = { success: true, cart: updatedCart }

    } catch (error) {
        console.log(error, `error from deleteProductFromCart`);
        logger.error('error desde el deleteProductFromCart')
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART }
    }
}

const productsInCart = async ctx => {
    try {
        const { cartId } = ctx.params

        const cart = await CartDao.getById(cartId)
        if (!cart) return ctx.body = { error: true, message: ERRORS_UTILS.MESSAGES.NO_CART }

        const productsInCart = await cart.products

        ctx.body = { success: true, productsInCart: productsInCart }

    } catch (error) {
        console.log(error, `error from productsInCart`);
        logger.error('error desde el productsInCart')
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART }
    }

}

const cartById = async ctx => {
    try {

        const { id } = ctx.params

        const cart = await CartDao.getById(id)

        ctx.body = { success: true, cart }

    } catch (error) {
        console.log(error, `error from cartById`);
        logger.error('error desde el cartById')
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART }
    }
}

const buyCart = async ctx => {
    try {
        // let userName = req.user.name
        // console.log('userName: ', userName);
        // let userEmail = req.user.email
        // console.log('userEmail: ', userEmail);
        const { id } = ctx.params

        const cart = await CartDao.getById(id)
        if (!cart) return ctx.body = { error: true, message: ERRORS_UTILS.MESSAGES.NO_CART }

        let subject = 'Nuevo pedido!'
        let mailTo = config.MAIL.USER
        //me manda mail con la coma VER ESO EL VIERNES
        let listado = cart.products.map(({ title }) => (
            `
            <li>${title}</li>
            `
        )).join('')


        let html = `
                        <h3>Nuevo pedido de: prueba </h3>
                        <p> Datos:</p>
                        <ul>
                            ${listado}
                        </ul>
                    `



        await EMAIL_UTILS.sendEmail(mailTo, subject, html)

        //Aca cambiar 'prueba' por el nombre del usuario
        const options = {
            body: `Nuevo pedido de: prueba`
        }

        await SEND_WHATSAPP.whatsappConfig(options)

        ctx.body = { success: true, cart }

    } catch (error) {
        console.log(error, `error from cartById`);
        logger.error('error desde el cartById')
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_CART }
    }
}

export const CartController = { saveCart, updatedCartById, deleteCart, deleteProductFromCart, buyCart, productsInCart, cartById }