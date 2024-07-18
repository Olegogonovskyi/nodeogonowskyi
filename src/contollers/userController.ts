import {NextFunction, Request, Response} from "express";
import {userService} from "../services/usersService";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll()
            res.status(200).json(users)
        } catch (e) {
next(e)
        }
    }
}

export const userController = new UserController()