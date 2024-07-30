import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "../errors/error.api.service";
import {ToknEnam} from "../enums/toknEnam";
import {tokenService} from "../services/token.service";

class ActionTokenMiddleware {
    public checkToken(typeActionToken: ToknEnam) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const actionVerToken = req.body.actionToken
                if (!actionVerToken) {
                    throw new ApiErrors(' Verify token is missing', 401)
                }
                const {idUser} = tokenService.checkToken(actionVerToken, ToknEnam.VERIFIED)
                req.res.locals.jwtPayload = idUser
                req.res.locals.actionVerToken = actionVerToken
                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

export const actionTokenMiddleware = new ActionTokenMiddleware()