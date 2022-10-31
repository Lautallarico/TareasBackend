import { Contenedor } from "../class/contenedor.js";
import { config } from "../config/index.js";

const CartApi = new Contenedor(config.DATABASE.filesystem.CART_FILENAME)

export { CartApi }
