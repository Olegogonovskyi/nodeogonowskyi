import {Request, Response, NextFunction} from "express"
import {logoutService} from "../services/logout.service";


class LogoutControllers {
    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            await logoutService.logout(header)

            res.status(200).json('Bye')

        } catch (e) {
            next(e)
        }
    }

}

export const logoutControllers = new LogoutControllers()