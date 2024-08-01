import mongoose, { Schema } from 'mongoose';
import {ICustoner} from "../interfaces/ICustoner";

const schema = new Schema({
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
export const customerModel = mongoose.model<ICustoner>('customer', schema)