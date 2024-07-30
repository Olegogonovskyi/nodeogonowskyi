import {Router} from "express";
import {authControllers} from "../controllers/authControllers";
import {customerChekkerMiddleware} from "../middelwares/customer.chekker.middleware";
import {authMiddleware} from "../middelwares/auth.middleware";
import {actionTokenMiddleware} from "../middelwares/actionTokenchecker..middleware";
import {ToknEnam} from "../enums/toknEnam";


const router = Router()

router.post('/register', customerChekkerMiddleware.isCustomerValid(), authControllers.register)
router.post('/login',  customerChekkerMiddleware.isCustomerValid(), authControllers.login)
router.post('/refresh',   authMiddleware.checkRefrToken, authControllers.refresh)
router.post('/verify',   actionTokenMiddleware.checkToken(ToknEnam.VERIFIED), authControllers.verify)


export const authRouter = router