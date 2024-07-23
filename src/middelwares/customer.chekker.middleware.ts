import {NextFunction, Request, Response} from "express";
import {isValid} from "../patterns/pattern.service";
import {ApiErrors} from "../errors/error.api.service";

class CustomerChekkerMiddleware {
    public isCustomerValid() {
        return (req: Request, res: Response, next: NextFunction) => {
            const {email, password} = req.body
            try {

                if (!isValid(email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    throw new ApiErrors('wrong email', 401)
                }
                if (!isValid(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                    throw new ApiErrors('in password you must use 1 big letter, 1 little letter and 1 number and special symbol', 401)
                }
                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

export const customerChekkerMiddleware = new CustomerChekkerMiddleware()