import {Router} from "express";
import {AuthController} from "../controllers/auth";

export class UserRouter {
    public router: Router;
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        console.log('hello');
        this.routes();
    }

    routes(){
        this.router.post('/signup', this.authController.registerUser);
        this.router.post('/signin', this.authController.loginUser);
    }
}
