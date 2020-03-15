import {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {User} from '../models/user';
import {SECRET_KEY} from "../../local";

export class AuthController {
    public registerUser = async (req: Request, res: Response) => {
        try {
            const user = await User.create(req.body);
            const {email, password, id} = user;
            const token = jwt.sign({
                    id,
                    email,
                    password
                },
                SECRET_KEY
            );

            return res.status(200).json({
                id,
                email,
                token
            });
        } catch (err) {
            console.log(`ERROR in register route: ${err}`)
        }
    }
}
