import {Schema, model} from 'mongoose'
import {IUser} from "../interfaces/IUser";
import {GenderEnum} from "../enums/gender.enum";

const schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
    age: {
        type: Number,
        Min: 3
    },
    superpowers: {
        type: [String],
        required: true
    },
    gender: {
        type: String,
        enum: GenderEnum
    }
}, {
    timestamps: true,
    versionKey:false
})

export const UserModel = model<IUser>('user', schema)