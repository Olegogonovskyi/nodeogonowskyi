import {Request, Response, NextFunction} from "express"
import {authService} from "../services/auth.service";
import {ICustoner} from "../interfaces/ICustoner";
import {ITokenPayload} from "../interfaces/ITokenPayload";

class AuthControllers {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(11)
            const userToReg = req.body as ICustoner

            const result = await authService.register(userToReg)
            console.log(12)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userToLog = req.body as ICustoner
            const result = await authService.login(userToLog)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {

            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload

            const result = await authService.refresh(jwtPayload)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }

}

export const authControllers = new AuthControllers()