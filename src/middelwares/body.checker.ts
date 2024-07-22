import {NextFunction, Request, Response} from "express";

class BodyChecker {
    public isBodyValid() {
        return (req: Request, res: Response, next: NextFunction) => {
            const {name, password} = req.body
        }
    }
}