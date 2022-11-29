import { ContainerMongoDB } from "../../container/index.js";
import { ChatModel } from "../../models/index.js";

export class ChatMongo extends ContainerMongoDB {
    constructor() {
        super({
            name: ChatModel.ChatCollection,
            schema: ChatModel.ChatSchema,
        });
    }
}