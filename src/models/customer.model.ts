import {Schema, model} from 'mongoose'
import {ICustoner} from "../interfaces/ICustoner";

const shema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isVeryied: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    })
export const customerModel = model<ICustoner>('customer', shema)