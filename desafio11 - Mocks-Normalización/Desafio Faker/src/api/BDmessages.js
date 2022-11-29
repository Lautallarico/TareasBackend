import { ContenedorBD } from '../class/contenedorBD.js'
import { optionSQLite } from '../DB/SQLite3/serverSQL.js'

const MessagesBD = new ContenedorBD(optionSQLite)

export { MessagesBD }