// const express = require('express')
import express from 'express'
// const { Router } = express
import { Router } from 'express'
const router = Router()
// const Contenedor = require('../class/contenedor')
import { Contenedor } from '../class/contenedor.js'


// aca agregar el new contenedor para hacer un doc nuevo

const products = new Contenedor('data/productos')


router.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    res.send({ success: true, data: allProducts })
})


router.get('/:id', async (req, res) => {
    const id = req.params.id
    const product = await products.getById(Number(id))

    if (!product) {
        return res.send({ success: false, data: undefined, message: 'Product not found' })
    }

    res.send({ success: true, data: product })
})


router.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body

    const product = await products.save({ title, price, thumbnail })

    res.send({ success: true, data: { id: product.id } })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const element = req.body

    const getElement = products.find((obj) => obj.id == id)
    const deleteElement = getElement == undefined ? 'El producto no existe' : products.splice(id - 1, 1, element)

    res.send(deleteElement)
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    const updatedProduct = products.updateById(id, { title, price, thumbnail });

    res.send({ success: true, data: { updated: updatedProduct } });
})


// module.exports = router

export { router }