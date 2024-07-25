import {Request, Response, NextFunction} from "express"
import {userService} from "../services/user.service";
import {IUser} from "../interfaces/IUser";



class UserControllers {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getAll()
            res.json(result)
        } catch (e) {
            next(e)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = req.body as IUser;
            const result = await userService.create(newUser)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id
        try {
            const user = await userService.getById(userId)
            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id
            await userService.delete(userId)
            res.status(201).json('User was deletet')
        } catch (e) {
            next(e)
        }

    }

    public async put(req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = req.body as IUser;
            const userId = req.params.id
            await userService.put(userId,newUser)
            res.status(200).json('user changed')
        } catch (e) {
            next(e)
        }
    }

}

export const userControllers = new UserControllers()