import {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';
import {SECRET_KEY} from "../../local";

export class AuthController {
    public registerUser = async (req: Request, res: Response) => {
        try {
            const user: any = new User(req.body);
            const {email, password, _id} = user._doc;
            const token = jwt.sign({
                    _id,
                    email,
                    password
                },
                SECRET_KEY
            );
            await user.save();
            return res.status(200).json({
                _id,
                email,
                token
            });
        } catch (err) {
            return res.status(400).json(`ERROR in register controller: ${err}`);
        }
    };

    public loginUser = async (req: Request, res: Response) => {
        try {
            // @ts-ignore
            const user: IUser = await User.findOne({email: req.body.email});
            const {email, _id, password} = user._doc;
            const isMatch = await user.comparePassword(req.body.password);
            if (isMatch) {
                const token = jwt.sign({
                    _id, email, password
                }, SECRET_KEY);
                return res.status(200).json({
                    email,
                    _id,
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
