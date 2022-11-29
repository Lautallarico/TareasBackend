import { normalize, schema, denormalize } from "normalizr";
import util from 'util'

const originalData = {
    id: "999",
    posts: [
        {
            id: "123", author: { id: "1", nombre: "Pablo", apellido: "Perez", DNI: "20442654", direccion: "CABA 123", telefono: "1567876547" }, title: "My awesome blog post", comments: [{ id: "324", commenter: { id: "2", nombre: "Nicole", apellido: "Gonzalez", DNI: "20442638", direccion: "CABA 456", telefono: "1567811543" } }, { id: "325", commenter: { id: "3", nombre: "Pedro", apellido: "Mei", DNI: "20446938", direccion: "CABA 789", telefono: "1567291542" } }]
        },
        {
            id: "1123", author: { id: "2", nombre: "Nicole", apellido: "Gonzalez", DNI: "20442638", direccion: "CABA 456", telefono: "1567811543" }, title: "My awesome blog post", comments: [{ id: "1324", commenter: { id: "1", nombre: "Pablo", apellido: "Perez", DNI: "20442654", direccion: "CABA 123", telefono: "1567876547" } }, { id: "1325", commenter: { id: "3", nombre: "Pedro", apellido: "Mei", DNI: "20446938", direccion: "CABA 789", telefono: "1567291542" } }]
        },
        {
            id: "2123", author: { id: "3", nombre: "Pedro", apellido: "Mei", DNI: "20446938", direccion: "CABA 789", telefono: "1567291542" }, title: "My awesome blog post", comments: [{ id: "2324", commenter: { id: "2", nombre: "Nicole", apellido: "Gonzalez", DNI: "20442638", direccion: "CABA 456", telefono: "1567811543" } }, { id: "2325", commenter: { id: "1", nombre: "Pablo", apellido: "Perez", DNI: "20442654", direccion: "CABA 123", telefono: "1567876547" } }]
        }
    ]
}

const user = new schema.Entity('users')
const comment = new schema.Entity('comments', {
    commenter: user
})

const post = new schema.Entity('post', {
    author: user,
    comments: [comment]
})

const articles = new schema.Entity('articles', {
    post: [post]
})

const normalizrData = normalize(originalData, articles)
console.log('------------------ Datos normalizados ------------------');
console.log(normalizrData);

const dataOriginal = denormalize(normalizrData.result, articles, normalizrData.entities)
console.log('------------------ Datos denormalizados ------------------');
console.log(dataOriginal);

const normalElement = parseInt(JSON.stringify(normalizrData).length)
const originalElement = parseInt(JSON.stringify(dataOriginal).length)

console.log(JSON.stringify(originalData).length);
console.log(JSON.stringify(normalizrData).length);

function porcent(firstElement, secondElement) {
    const porcents = ((firstElement / secondElement * 100) - 100).toFixed(2)
    console.log(`El porcentaje de compresion fue del ${porcents}%`);
}

porcent(normalElement, originalElement)