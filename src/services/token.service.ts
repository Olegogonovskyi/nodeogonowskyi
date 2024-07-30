import * as jsonwebtoken from "jsonwebtoken";
import {ITokenPayload} from "../interfaces/ITokenPayload";
import {ITokenPairGenre} from "../interfaces/ITokenPairGenre";
import {configs} from "../configs/config";
import {ApiErrors} from "../errors/error.api.service";
import {ToknEnam} from "../enums/toknEnam";
import {ActionToknEnam} from "../enums/actionToknEnam";

class TokenService {
    public async generePair(payload: ITokenPayload): Promise<ITokenPairGenre> {
        const refreshtoken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRES_IN})
        const accesstoken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRES_IN})
        return {accesstoken, refreshtoken}

    }

    public async genreActionToken(payload: ITokenPayload, tokenType: ActionToknEnam): Promise<string> {
        try {
            let secret: string;
            let expiresIn: string
            switch (tokenType) {
                case ActionToknEnam.VERIFIED:
                    secret = configs.JWT_ACTION_VERIFIED_SECRET;
                    console.log(secret)
                    expiresIn = configs.JWT_ACTION_VERIFIED_EXPIRES_IN;
                    console.log(expiresIn)
                    break;
                default:
                    throw new ApiErrors("Token type is not valid", 401);
            }
            return  jsonwebtoken.sign(payload, secret, {expiresIn})
                    } catch (e) {
            throw new ApiErrors("Invalid or expired token", 401)
        }
    }

    public  checkToken(token: string, tokenType: ToknEnam): ITokenPayload{
        try {
            let actuakToken: string
            switch (tokenType) {
                case ToknEnam.ACCES:
                    actuakToken = configs.JWT_ACCESS_SECRET;
                    break;
                case ToknEnam.REFRESH:
                    actuakToken = configs.JWT_REFRESH_SECRET;
                    break;
                case ToknEnam.VERIFIED:
                    actuakToken = configs.JWT_ACTION_VERIFIED_SECRET
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