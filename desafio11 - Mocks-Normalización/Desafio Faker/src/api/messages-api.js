import { Contenedor } from "../class/contenedor.js";
import { config } from "../config/index.js";

const MessagesApi = new Contenedor(config.DATABASE.filesystem.MESSAGES_FILENAME)

export { MessagesApi }