import { ContenedorBD } from '../class/contenedorBD.js'
import { optionMariaDB } from '../DB/mariaDB/serverMariaBD.js'

const ProductBD = new ContenedorBD(optionMariaDB)

export { ProductBD }