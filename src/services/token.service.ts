import * as jsonwebtoken from "jsonwebtoken";
import {ITokenPayload} from "../interfaces/ITokenPayload";
import {ITokenPairGenre} from "../interfaces/ITokenPairGenre";
import {configs} from "../configs/config";
import {ApiErrors} from "../errors/error.api.service";

class TokenService {
    public async generePair(payload: ITokenPayload): Promise<ITokenPairGenre> {
        const refreshtoken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_SECRET, {expiresIn: configs.JWT_REFRESH_EXPIRES_IN})

        const accesstoken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {expiresIn: configs.JWT_ACCESS_EXPIRES_IN})

        return {accesstoken, refreshtoken}
    }
    public async checkToken(token: string) {
        console.log(7)
        try {
             return jsonwebtoken.verify(token, configs.JWT_ACCESS_SECRET)
                } catch (e) {
            throw new ApiErrors("Invalid or expired token", 401)
                }
    }
}
export const tokenService = new TokenService()