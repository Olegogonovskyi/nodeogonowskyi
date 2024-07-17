import {Router} from "express";
import {userControllers} from "../errors/controllers/userControllers";

const router = Router()

router.get('/', userControllers.getAll)

export const userRouter = router