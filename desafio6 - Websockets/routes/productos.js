// const express = require('express')
import express from 'express'
// const { Router } = express
import { Router } from 'express'
const router = Router()
// const Contenedor = require('../class/contenedor')
// import { Contenedor } from '../class/contenedor.js'
import { ProductApi } from '../api/product-api.js'


// const products = new Contenedor('data/productos')


router.get('/', async (req, res) => {
    const allProducts = await ProductApi.getAll()
    res.send({ success: true, data: allProducts })
})


router.get('/:id', async (req, res) => {
    const id = req.params.id
    const product = await ProductApi.getById(Number(id))

    if (!product) {
        return res.send({ success: false, data: undefined, message: 'Product not found' })
    }

    res.send({ success: true, data: product })
})


router.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body

    const product = await ProductApi.save({ title, price, thumbnail })

    res.send({ success: true, data: { id: product.id } })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const product = await ProductApi.deleteById(Number(id))

    if (!product) {
        return res.send({ success: false, data: undefined, message: 'Product not found' })
    }

    res.send({ success: true, data: product })

})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    const updatedProduct = products.updateById(id, { title, price, thumbnail });

    res.send({ success: true, data: { updated: updatedProduct } });
})


// module.exports = router

export { router }