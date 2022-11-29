import { Schema } from "mongoose";

const ChatCollection = 'chats'

const ChatSchema = new Schema(
    {
        author: {
            id: { type: String, required: true, max: 15 },
            nombre: { type: String, required: true, max: 30 },
            apellido: { type: String, required: true, max: 30 },
            edad: { type: Number, required: true, max: 3 },
            alias: { type: String, required: true, max: 20 },
            avatar: { type: String, required: true, max: 15 },
            text: [{ type: Schema.Types.ObjectId, ref: 'messages' }]
        },
    }
)

ChatSchema.set('toJSON', {
    transform: (_, response) => {
        response.id = response._id
        delete response._id
        return response
    }
})


export const ChatModel = { ChatSchema, ChatCollection }