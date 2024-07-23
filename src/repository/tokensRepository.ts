import {ITokenPair} from "../interfaces/ITokenPair";
import {tokenModel} from "../models/token.model";

class TokensRepository {

    public async create(tokens: ITokenPair): Promise<any> {
        return await tokenModel.create(tokens)
    }

    public async deleteTokens(params: Partial<ITokenPair>) {
        await tokenModel.findOneAndDelete(params)
    }
}

export const tokensRepository = new TokensRepository()