const express = require('express')
const { Router } = express
const router = Router()

const productos = [{
    title: "producto1",
    price: 100,
    thumbnail: "imagen1.jpg",
    id: 1
}];


router.get('/api/productos', (req, res) => {
    res.send({ productos })
})

router.post('/api/productos', (req, res) => {
    const producto = req.body
    productos.push(producto)
    res.status(200).send('Producto agregado')
})

router.get('/api/productos/:id', (req, res) => {
    const id = req.params.id
    const element = req.body

    const getElement = productos.find((obj) => obj.id == id)
    const modifyElement = getElement == undefined ? 'El producto no existe' : productos.splice(id - 1, 1, element)

    res.send(modifyElement)
})

router.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id
    const element = req.body

    const getElement = productos.find((obj) => obj.id == id)
    const deleteElement = getElement == undefined ? 'El producto no existe' : productos.splice(id - 1, 1, element)

    res.send(deleteElement)
})


module.exports = router