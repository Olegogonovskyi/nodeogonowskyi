import {Request, Response, NextFunction} from "express"

class AuthControllers {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getAll()
            res.json(result)
        } catch (e) {
            next(e)
        }
    }

}

export const authControllers = new AuthControllers()