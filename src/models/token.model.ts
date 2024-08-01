import mongoose, { Schema } from 'mongoose';
import {UserModel} from "./user.model";
import {ITokenPair} from "../interfaces/ITokenPair";

const schema = new Schema({
    accesstoken: {
        type: String,
        required: true,

    },
    refreshtoken: {
        type: String,
        required: true,
    },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel }
}, {
    timestamps: true,
    versionKey:false
})

export const tokenModel = mongoose.model<ITokenPair>('tokens', schema)