const fs = require('fs')

class Contenedor {

    constructor(file) {
        this.fileDir = `./desafio2/${file}.txt`
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
}

const doc = new Contenedor('productos');

// doc.getAll()
//     .then(data => console.log({ data }))
//     .catch(error => console.log({ error }))

// doc.save(
//     {
//         title: 'Producto 1',
//         price: 100,
//         thumbnail: 'aunqowoq.jpg'
//     }
// )

// doc.save(
//     {
//         title: 'Producto 2',
//         price: 200,
//         thumbnail: 'fauywgfwoa.jpg'
//     }
// )

// doc.save(
//     {
//         title: 'Producto 3',
//         price: 300,
//         thumbnail: 'gwfqqf.jpg'
//     }
// )

// doc.getById(2)
//     .then(data => console.log({ data }))
//     .catch(error => console.log({ error }))
// SE LOCALIZO PRODUCTO CORRECTAMENTE

// doc.getById(5)
//     .then(data => console.log({ data }))
//     .catch(error => console.log({ error }))
// NO SE LOCALIZO NINGUN PRODUCTO

// doc.deleteById(1)
//     .then(data => console.log({ data }))
//     .catch(error => console.log({ error }))

// doc.deleteAll()
// SE BORRAN TODOS LOS PRODUCTOS