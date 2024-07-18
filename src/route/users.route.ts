import {Router} from "express";
import {userController} from "../contollers/userController";


const route = Router()

route.get('/', userController.getAll)

export const userRouter = route