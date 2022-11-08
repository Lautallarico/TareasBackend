import { Contenedor } from "../class/contenedor.js";
import { config } from "../config/index.js";

const ProductApi = new Contenedor(config.DATABASE.filesystem.PRODUCTS_FILENAME)

export { ProductApi }