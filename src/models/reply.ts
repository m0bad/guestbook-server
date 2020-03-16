import {Document, model, Model, Schema} from "mongoose";
import {IUser} from "./user";
import * as mongoose from "mongoose";
import {IMessage} from "./message";

export interface IReply extends Document {
    _doc: {
        _id: string,
        text: string,
        author: IUser,
        message: IMessage,
        createdAt: Date,
        updatedAt: Date,
    };
}

export const replySchema: Schema = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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


export const Reply: Model<IReply> = model<IReply>('Message', replySchema);
