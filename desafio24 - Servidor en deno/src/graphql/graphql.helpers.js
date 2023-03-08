import { ProductsMongo } from '../dao/Products/ProductMongoDB.js'

async function getProductById(id) {
    return ProductsMongo.getInstance().getById(id)
}

async function getAllProducts() {
    return ProductsMongo.getInstance().getAll()
}

async function createProduct({ datos }) {
    return ProductsMongo.getInstance().save(datos)
}

async function updateProductById(id, datos) {
    return ProductsMongo.getInstance().updateById(id, datos)
}
async function deleteProductById(id) {
    return ProductsMongo.getInstance().deleteById(id)
}

export const functionsGraphQL = { getProductById, getAllProducts, createProduct, deleteProductById, updateProductById }