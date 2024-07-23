import {NextFunction, Request, Response} from "express";
import {isValid} from "../patterns/pattern.service";
import {ApiErrors} from "../errors/error.api.service";

class BodyCheckerMiddleware {
    public isBodyValid(idParams: boolean) {
        return (req: Request, res: Response, next: NextFunction) => {
            const {name, superpowers, age} = req.body
            try {
                if (idParams) {
                    const id = req.body.id
                    if (req.body._id != id) {
                        throw new ApiErrors('ID never change', 400)
                    }
                }
                if (!isValid(name, /^[a-zA-Zа-яА-Я\s]{2,}$/)) {
                    throw new ApiErrors('Somesing wrong with your name', 400)
                }
                if (!superpowers.length) {
                    throw new ApiErrors('It is not superhero', 400)
                }
                if (!age || age < 1) {
                    throw new ApiErrors('Go to bad little child', 400)
                }
                next()
            } catch (e) {
                next(e)

            }
        }
    }
}

export const bodyCheckerMiddleware = new BodyCheckerMiddleware()