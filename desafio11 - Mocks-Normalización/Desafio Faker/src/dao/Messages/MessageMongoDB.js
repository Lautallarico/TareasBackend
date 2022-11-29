import { ContainerMongoDB } from "../../container/index.js";
import { MessageModel } from "../../models/index.js";

export class MessageMongo extends ContainerMongoDB {
    constructor() {
        super({
            name: MessageModel.MessagesCollection,
            schema: MessageModel.MessagesSchema
        });
    }
}