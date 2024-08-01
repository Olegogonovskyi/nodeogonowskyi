import {NextFunction, Request, Response} from "express";
import {isValid} from "../patterns/pattern.service";
import {ApiErrors} from "../errors/error.api.service";

class ChangePasswordChekkerMiddleware {
    public isCustomerValid() {
        return (req: Request, res: Response, next: NextFunction) => {
            const {newPassword, oldPassword} = req.body
            try {

                req.res.locals.paswords = {newPassword, oldPassword}
                if (!isValid(newPassword, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                    throw new ApiErrors('in password you must use 1 big letter, 1 little letter and 1 number and special symbol', 401)
                }
                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

export const changePasswordChekkerMiddleware = new ChangePasswordChekkerMiddleware()