import {Router} from "express";
import {MessagesController} from "../controllers/messages";

export class MessagesRouter {
    public router: Router;
    public messagesController: MessagesController = new MessagesController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/get', this.messagesController.getAllMessages);
        this.router.post('/add', this.messagesController.addMessage);
    }
}
