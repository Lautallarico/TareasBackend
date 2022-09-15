class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return (`El nombre del usuario es ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        return this.mascotas.push(mascota)
    }
    countMascotas() {
        return this.mascotas.length
    }

    addBook(nuevoLibro, nuevoAutor) {
        let newBook = { nombre: nuevoLibro, autor: nuevoAutor }
        this.libros.push(newBook)
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre)
    }
}

const nuevoUsuario = new Usuario('Juan', 'Perez', [{ nombre: 'Libro 1', autor: 'autor 1' }], ['perro', 'elefante'])

console.log(nuevoUsuario);

console.log(nuevoUsuario.countMascotas());
console.log(nuevoUsuario.addMascota('Gato'));
console.log(nuevoUsuario.countMascotas());

console.log(nuevoUsuario.addBook('Libro nuevo', 'Autor nuevo'));
console.log(nuevoUsuario.libros);

console.log(nuevoUsuario.getBookNames());

