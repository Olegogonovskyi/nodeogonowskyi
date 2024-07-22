import {NextFunction, Request, Response} from "express";
import {patternService} from "../services/pattern.service";
import {ApiErrors} from "../errors/error.api.service";

class BodyChecker {
    public isBodyValid() {
        return (req: Request, res: Response, next: NextFunction) => {
            const {name, password} = req.body
            try {
                if (!patternService(name, /^[a-zA-Zа-яА-Я\s]{2,}$/)) {
                    throw new ApiErrors('Somesing wrong with your name', 400)
                }
                if (!patternService(password, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) { // Minimum eight characters, at least one letter and one number:
                    throw new ApiErrors('Minimum eight characters, at least one letter and one number', 400)
                }
                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

export const bodyChecker = new BodyChecker()