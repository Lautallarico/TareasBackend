
import { ProductDao } from '../../dao/index.js'
import logger from '../../loggers/loggers.js'
import { DATE_UTILS, ERRORS_UTILS, JOI_VALIDATOR } from '../../utils/index.js'


const getAll = async ctx => {
    try {

        ctx.body = await ProductDao.getAll()

    } catch (error) {
        console.log(error, `error from getAll`);
        logger.error('error desde el getAll: ' + error)
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
    }
}

const getById = async ctx => {
    try {
        const { id } = ctx.params
        const product = await ProductDao.getById(id)
        if (!product) {
            return ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
        }
        ctx.body = { success: true, data: product }
    } catch (error) {
        logger.error(error, `error from getById`)
        console.log(error, `error from getById`);
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
    }
}

const createProduct = async ctx => {
    try {
        const { title, description, code, price, thumbnail, stock } = ctx.request.body
        // console.log({ title, description, code, price, thumbnail, stock });
        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, price, thumbnail, stock, timestamp: DATE_UTILS.getTimestamp(), })
        // console.log(product);
        await ProductDao.save(product)

        ctx.body = { success: true, data: product }

    } catch (error) {
        logger.error(error, `error from createProduct`);
        console.log(error, `error from createProduct`);
        ctx.body = { success: false, data: product }

    }
}

const deleteProduct = async ctx => {
    try {
        const { id } = ctx.params
        const product = await ProductDao.deleteById(id)

        if (!product) {
            return ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
        }

        ctx.body = { success: true, data: product }


    } catch (error) {
        logger.error(error, `error from deleteProduct`)
        console.log(error, `error from deleteProduct`);
        ctx.body = { success: false, data: undefined, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT }
    }

}


export const ProductController = { getAll, getById, createProduct, deleteProduct }
