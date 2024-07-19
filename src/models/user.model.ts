import {Schema, model} from 'mongoose'
import {IUser} from "../interfaces/IUser";

const schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        unique: true,
        trim: true
    }
}, {
    timestamps: true,
    versionKey:false
})

export const UserModel = model<IUser>('user', schema)