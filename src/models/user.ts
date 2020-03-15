import {Document, model, Model, Schema} from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string,
    password: string
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
    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (psw: string): boolean {
    return bcrypt.compareSync(psw, this.password);
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
