import {NextFunction, Request, Response} from "express";
import {isObjectIdOrHexString} from "mongoose";
import {ApiErrors} from "../errors/error.api.service";


class IdChekkerMiddleware {
    public isIdValid(paramName: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[paramName]
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiErrors('Somethong wrong with your id', 400)
                }
                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

export const idChekkerMiddleware = new IdChekkerMiddleware()