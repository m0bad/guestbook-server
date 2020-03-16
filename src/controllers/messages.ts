import {Request, Response} from "express";

export class MessagesController {
    public getAllMessages = async (req: Request, res: Response) => console.log('OK');

    public addMessage = async (req: Request, res: Response) => console.log('OK');
}
