import { Router } from "express";
import { ProductApi } from "../api/product-api.js";

const ViewsRouter = Router()

ViewsRouter.get('/', (req, res) => {
    res.render('form-products')
})

ViewsRouter.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body

    ProductApi.save({ title, price, thumbnail })

    res.redirect('/')
})

ViewsRouter.get('/productos', async (req, res) => {
    const products = await ProductApi.getAll()
    
    res.render('table-products', { productos: products })
})


export { ViewsRouter }