import {Response, Request, NextFunction} from 'express'
import {userService} from "../services/user.service";
import {IUser} from "../intwrfaces/IUser";
import {passwordService} from "../services/password.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getAll()
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {

            const {password} = req.body as IUser
            const hashPassword = await passwordService.hash(password)
            const newUser = {...req.body, password: hashPassword}
            const result = await userService.create(newUser)
            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const result = await userService.findById(id)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async put(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const userToChange = req.body
            const result = await userService.put(id, userToChange)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await userService.delete(id)
            res.status(204).json('deleted')
        } catch (e) {
            next(e)
        }
    }
}

export const userController = new UserController()