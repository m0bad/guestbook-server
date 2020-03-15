import {Document, model, Model, Schema} from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _doc: {
        _id: string,
        email: string,
        password: string,
    };
    comparePassword(password: string): boolean
}

export const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>('save', function save(next) {
    this._doc.password = bcrypt.hashSync(this._doc.password, 10);
    next();
});

userSchema.methods.comparePassword = function (psw: string): boolean {
    return bcrypt.compareSync(psw, this.password);
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
