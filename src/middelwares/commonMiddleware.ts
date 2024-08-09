import {ObjectSchema} from "joi";
import {NextFunction, Request, Response} from "express";
import {ApiErrors} from "../errors/error.api.service";

class CommonMiddleware {
    public isQueryValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.query = await validator.validateAsync(req.query)
                next()
            } catch (e) {
                next(new ApiErrors(e.details[0].message, 400))
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware()