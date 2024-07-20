import {NextFunction, Request, Response} from "express";
import {isValidName} from "../patterns/pattern.service";
import {ApiErrors} from "../errors/error.api.service";

class BodyCheckerMiddleware {
    public isBodyValid() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!isValidName(req.body.name, /^[a-zA-Zа-яА-Я\s]{3,}$/)) {
                    throw new ApiErrors('Somesing wrong with your name', 400)
                }
            } catch (e) {

            }
        }
    }
}