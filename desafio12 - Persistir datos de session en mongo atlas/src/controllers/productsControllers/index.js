import { createFakeProducts } from "../../utils/faker-products.js";

const getProductsTest = async (req, res) => {
    try {
        const products = createFakeProducts(5)
        res.send({ success: true, data: products })

    } catch (error) {
        console.log(error, `error from getProductsTest`);
        res.send({ success: false, data: undefined, message: 'products not found' })
    }
}

export const ProductController = { getProductsTest }