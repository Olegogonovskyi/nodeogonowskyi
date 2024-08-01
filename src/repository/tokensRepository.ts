import {ITokenPair} from "../interfaces/ITokenPair";
import {tokenModel} from "../models/token.model";

class TokensRepository {

    public async create(tokens: ITokenPair): Promise<any> {
        return await tokenModel.create(tokens)
    }

    public async deleteTokens(params: Partial<ITokenPair>) {
        await tokenModel.findOneAndDelete(params)
    }
    public async deleteAll(params: Partial<ITokenPair>) {
        await tokenModel.deleteMany(params)
    }
    public async findByTokenParams(params: Partial<ITokenPair>): Promise<ITokenPair> {
        return await tokenModel.findOne(params)
    }
}

export const tokensRepository = new TokensRepository()