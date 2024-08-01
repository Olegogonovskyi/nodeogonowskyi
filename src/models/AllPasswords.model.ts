import mongoose, { Schema } from 'mongoose';
import {UserModel} from "./user.model";
import {IAllPaswords} from "../interfaces/IAllPaswords";

const schema = new Schema({
    password: {
        type: String,
        required: true,
    },
    _userId: { type: Schema.Types.ObjectId,
        required: true,
        ref: UserModel }
}, {
    timestamps: true,
    versionKey:false
})

export const allPasswordmodel =  mongoose.model<IAllPaswords>('allPassword', schema)