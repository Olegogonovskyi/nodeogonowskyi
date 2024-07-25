import {Router} from "express";
import {logoutControllers} from "../controllers/logoutControllers";


const router = Router()

router.post('/',logoutControllers.logout)



export const logoutRouter = router