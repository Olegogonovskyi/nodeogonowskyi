import {actionTokenModel} from "../models/ActionToken.model";
import {FilterQuery} from "mongoose";
import {IAllPaswords} from "../interfaces/IAllPaswords";
import {allPasswordmodel} from "../models/AllPasswords.model";

class AllPasswordsRepository {

    public async create(hasedPassword: IAllPaswords) {
        await allPasswordmodel.create(hasedPassword)
    }

    public async findAll(userId: string): Promise<IAllPaswords[]> {
        return await allPasswordmodel.find({_userId: userId})
    }

    public async deleteTokens(params: FilterQuery<IAllPaswords>) {
        await actionTokenModel.deleteMany(params)
    }

    // public async findByToken(token: string): Promise<IActionToken> {
    //     return await actionTokenModel.findOne({token})
    // }
}

export const allPasswordsRepository = new AllPasswordsRepository()