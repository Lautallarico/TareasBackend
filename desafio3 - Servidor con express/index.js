
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8080

class Contenedor {

    constructor(file) {
        this.fileDir = `./${file}.txt`
    }

    async save(element) {
        try {
            const allElements = await this.getAll()
            const lastElementId = allElements.length === 0 ? 1 : allElements[allElements.length - 1].id + 1
            element.id = lastElementId
            allElements.push(element)

            await fs.promises.writeFile(this.fileDir, JSON.stringify(allElements, null, 3))
        } catch (error) {
            console.log(`El error esta en el SAVE ${error}`);
        }
    }

    async getById(id) {
        try {
            const allElements = await this.getAll()

            const elementById = allElements.find(element => element.id == id)

            if (!elementById) return 'El elemento no fue localizado - Element not found'
            return elementById

        } catch (error) {
            console.log(`El error esta en el GETBYID ${error}`);
        }
    }

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.fileDir, 'utf-8')
            const allElements = JSON.parse(file)

            return allElements
        } catch (error) {

            if (error.code === 'ENOENT') {
                await fs.promises.writeFile(this.fileDir, JSON.stringify([], null, 3));
                return []
            }
            console.log(`El error esta en el GETALL --${error}--`)
        }
    }

    async deleteById(id) {
        try {

            const allElements = await this.getAll()
            const elementById = allElements.find(element => element.id == id)
            if (!elementById) return 'El elemento no fue localizado - Element not found'

            const elementsFilter = allElements.filter(element => element.id != id)

            await fs.promises.writeFile(this.fileDir, JSON.stringify(elementsFilter, null, 3))

        } catch (error) {
            console.log(`El error esta en el DELETEBYID ${error}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileDir, JSON.stringify([], null, 3))
        } catch (error) {
            console.log(`El error esta en el DELETEALL ${error}`);
        }
    }

    async getRandom() {
        try {
            const element = await this.getAll()
            return element[Math.floor(Math.random() * element.length)]
        } catch (error) {
            console.log(`El error esta en el GetRandom ${error}`)
        }
    }
}

const docDesafio3 = new Contenedor('desafio3');

// docDesafio3.getAll()
//     .then(data => console.log({ data }))
//     .catch(error => console.log({ error }))


docDesafio3.save(
    {
        title: 'Producto 1',
        price: 111,
        thumbnail: 'unouno.jpg'
    }
)

docDesafio3.save(
    {
        title: 'Producto 2',
        price: 222,
        thumbnail: 'dosdos.jpg'
    }
)

docDesafio3.save(
    {
        title: 'Producto 3',
        price: 333,
        thumbnail: 'trestres.jpg'
    }
)

app.get('/productos', (req, res) => {
    docDesafio3.getAll()
        .then(lista => { res.send(lista) })
})

app.get('/productoRandom', (req, res) => {
    docDesafio3.getRandom()
        .then(lista => { res.send(lista) })
})

const connectedServer = app.listen(PORT, () => console.log(`SERVIDOR INICIALIZADO EN EL PUERTO ${PORT}`))
connectedServer.on("error", error => console.log(`Error en servidor ${error}`))
