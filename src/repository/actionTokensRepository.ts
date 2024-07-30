import {IActionToken} from "../interfaces/IActionToken";
import {actionTokenModel} from "../models/ActionToken.model";
import {FilterQuery} from "mongoose";

class ActionTokensRepository {

    public async create(token: IActionToken): Promise<any> {
        return await actionTokenModel.create(token)
    }

    public async deleteTokens(params: FilterQuery<IActionToken>) {
        await actionTokenModel.deleteMany(params)
    }
    public async findByToken(token: string): Promise<IActionToken> {
        return await actionTokenModel.findOne({token})
    }
}

export const actionTokensRepository = new ActionTokensRepository()