import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "../errors/error.api.service";
import {tokenService} from "../services/token.service";
import {tokensRepository} from "../repository/tokensRepository";
import {ToknEnam} from "../enums/toknEnam";

class AuthMiddleware {
    public async checkAccesToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiErrors('Authorization header is missing', 401)
            }
            const token = header.split("Bearer ")[1];
            req.res.locals.tokenPayload = token
            tokenService.checkToken(token, ToknEnam.ACCES)
            const pair = tokensRepository.findByTokenParams({accesstoken: token})
            if (!pair) {
                throw new ApiErrors("Token is not valid", 401);
            }
            next()
        } catch (e) {
            next(e)
        }
    }

    public async checkRefrToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiErrors('Authorization header is missing', 401)
            }
            const token = header.split("Bearer ")[1];
            const payload = tokenService.checkToken(token, ToknEnam.REFRESH)
            const pair = tokensRepository.findByTokenParams({refreshtoken: token})
            if (!pair) {
                throw new ApiErrors("Token is not valid", 401);
            }
            req.res.locals.jwtPayload = payload;
            next()
        } catch (e) {
            next(e)
        }
    }

}

export const authMiddleware = new AuthMiddleware()