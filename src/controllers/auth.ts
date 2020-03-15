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
            console.log(`ERROR in register controller: ${err}`)
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            const user: any = await User.findOne({email: req.body.email});
            const {email, id, password} = user;
            const isMatch = await user.comparePassword(req.body.password);
            if (isMatch) {
                const token = jwt.sign({
                    id, email, password
                }, SECRET_KEY);
                return res.status(200).json({
                    email,
                    id,
                    token
                });
            } else {
                return res.status(400).json({message: 'Invalid email/password'})
            }
        } catch (err) {
            console.log(`ERROR in login controller: ${err}`)
        }
    }
}
