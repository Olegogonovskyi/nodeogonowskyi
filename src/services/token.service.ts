import * as jsonwebtoken from "jsonwebtoken";
import {ITokenPayload} from "../interfaces/ITokenPayload";
import {ITokenPairGenre} from "../interfaces/ITokenPairGenre";
import {configs} from "../configs/config";

class TokenService {
    public async generePair(payload: ITokenPayload): Promise<ITokenPairGenre> {
        const refreshtoken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRES_IN})

        const accesstoken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRES_IN})

        return {accesstoken, refreshtoken}
    }
}
export const tokenService = new TokenService()