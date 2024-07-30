import {Schema, model} from 'mongoose'
import {UserModel} from "./user.model";
import {ActionToknEnam} from "../enums/actionToknEnam";
import {IActionToken} from "../interfaces/IActionToken";

const schema = new Schema({
    actiontoken: {
        type: String,
        required: true,
    },
    typeofToken: {
        type: String,
        enumerable: ActionToknEnam,
        required: true
    },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: UserModel }
}, {
    timestamps: true,
    versionKey:false
})

export const actionTokenModel = model<IActionToken>('actionTokens', schema)