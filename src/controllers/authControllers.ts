import {NextFunction, Request, Response} from "express"
import {authService} from "../services/auth.service";
import {ICustoner} from "../interfaces/ICustoner";
import {ITokenPayload} from "../interfaces/ITokenPayload";
import {tokenService} from "../services/token.service";
import {ToknEnam} from "../enums/toknEnam";
import {UploadedFile } from "express-fileupload"
import {UserPresenter} from "../presenters/user.presenter";

class AuthControllers {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userToReg = req.body as ICustoner
            const result = await authService.register(userToReg)
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
    public async verify(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.res.locals.jwtPayload
            console.log(userId)
            const actionVerToken = req.res.locals.actionVerToken
            const result = await authService.verify(userId, actionVerToken)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }
    public async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const accesToken = req.res.locals.tokenPayload;
            const {newPassword, oldPassword} = req.res.locals.paswords
            const result = await authService.changePassword(accesToken, newPassword, oldPassword)
            res.status(204).json(result)
                } catch (e) {
            next(e)
                }
    }
    public async changeAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const accesToken = req.res.locals.tokenPayload; //todo ьщже без змінної, а зразу в чек
            const avatar = req.files?.avatar as UploadedFile
            const {idUser} =  tokenService.checkToken(accesToken, ToknEnam.ACCES)
            const customer = await authService.changeAvatar(idUser, avatar)
            const result = UserPresenter.toResponse(customer)
            res.status(201).json(result)
                } catch (e) {
            next(e)
                }
    }
}

export const authControllers = new AuthControllers()