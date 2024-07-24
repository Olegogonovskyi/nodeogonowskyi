import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "../errors/error.api.service";
import {tokenService} from "../services/token.service";
import {tokensRepository} from "../repository/tokensRepository";

class AuthMiddleware {
    public async checkAccesToken(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(1)
            const header = req.headers.authorization;
console.log(2)
            console.log(header)
            if (!header) {
                console.log(3)
                throw new ApiErrors('Authorization header is missing', 401)
            }
            console.log(4)
            const token = header.split("Bearer ")[1];
            console.log(token)
            await tokenService.checkToken(token)
            console.log(5)
            const pair = tokensRepository.findByTokenParams({accesstoken: token})
            if (!pair) {
                throw new ApiErrors("Token is not valid", 401);
            }
            console.log(6)
            next()
        } catch (e) {
            next(e)
        }
    }
}

export const authMiddleware = new AuthMiddleware()