import {Request, Response, NextFunction} from "express"

import {userService} from "../services/user.service";
import {IUser} from "../interfaces/IUser";


class UserControllers {
    public async getAll(req: Request,  res: Response, next: NextFunction) {

        try {
            const result = await userService.getAll()
            res.json(result)
        } catch (e) {
            next(e)
        }

    }
    public async create(req: Request,  res: Response, next: NextFunction) {

        try {
            const newUser = req.body as IUser;
            console.log(newUser)
            const result = await userService.create(newUser)
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }
}

export const userControllers = new UserControllers()