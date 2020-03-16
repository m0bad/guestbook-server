import {Request, Response} from "express";
import {Message, IMessage} from "../models/message";

export class MessagesController {
    public getAllMessages = async (req: Request, res: Response) => {
    };

    public addMessage = async (req: Request, res: Response) => {
        try {
            const message: IMessage = new Message(req.body);
            await message.save();
            return res.status(200).json(message._doc);
        } catch (err) {
            return res.status(400).json(`ERROR on Add Message: ${err.message}`);
        }
    };
}
