import {Document, model, Model, Schema} from "mongoose";
import {IUser} from "./user";
import * as mongoose from "mongoose";
import {IReply} from "./reply";

export interface IMessage extends Document {
    _doc: {
        _id: string,
        text: string,
        author: IUser,
        replies: IReply[],
        createdAt: Date,
        updatedAt: Date,
    };
}

export const messageSchema: Schema = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    replies: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});


export const Message: Model<IMessage> = model<IMessage>('Message', messageSchema);
