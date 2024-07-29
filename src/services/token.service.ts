import * as jsonwebtoken from "jsonwebtoken";
import {ITokenPayload} from "../interfaces/ITokenPayload";
import {ITokenPairGenre} from "../interfaces/ITokenPairGenre";
import {configs} from "../configs/config";
import {ApiErrors} from "../errors/error.api.service";
import {ToknEnam} from "../enums/toknEnam";

class TokenService {
    public async generePair(payload: ITokenPayload): Promise<ITokenPairGenre> {
        const refreshtoken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRES_IN})
        const accesstoken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRES_IN})
        return {accesstoken, refreshtoken}
    }

    public async checkToken(token: string, tokenType: ToknEnam): Promise<boolean> {
        try {
            let actuakToken: string
            switch (tokenType) {
                case ToknEnam.ACCES:
                    actuakToken = configs.JWT_ACCESS_SECRET;
                    break;
                case ToknEnam.REFRESH:
                    actuakToken = configs.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiErrors("Token type is not valid", 401);
            }
            return jsonwebtoken.verify(token, actuakToken)
        } catch (e) {
            throw new ApiErrors("Invalid or expired token", 401)
        }
    }
}

export const tokenService = new TokenService()