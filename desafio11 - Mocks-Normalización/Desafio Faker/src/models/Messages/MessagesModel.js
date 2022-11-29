import { Schema } from "mongoose";

const MessagesCollection = 'messages'

const MessagesSchema = new Schema(
    {
        text: { type: String, required: true, max: 200 },
    }
)

MessagesSchema.set('toJSON', {
    transform: (_, response) => {
        response.id = response._id
        delete response.__v
        delete response._id
        return response
    }
})


export const MessageModel = { MessagesSchema, MessagesCollection }