import {Request, Response, NextFunction} from "express"
import {ApiErrors} from "../errors/error.api.service";

export interface IServise {
    err: ApiErrors
    req: Request,
    res: Response,
    next: NextFunction
}