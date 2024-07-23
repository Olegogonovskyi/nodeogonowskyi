import {Router} from "express";

const router = Router()

router.post('/register', userControllers.create)


export const authRouter = router