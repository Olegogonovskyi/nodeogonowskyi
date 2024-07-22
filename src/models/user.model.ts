import {Schema, model} from 'mongoose'
import {IUser} from "../intwrfaces/IUser";

const shema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })
export const userWTHpswModel = model<IUser>('userWTHpsw', shema)