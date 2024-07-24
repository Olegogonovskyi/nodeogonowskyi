import {Router} from "express";
import {authControllers} from "../controllers/authControllers";
import {customerChekkerMiddleware} from "../middelwares/customer.chekker.middleware";
import {authMiddleware} from "../middelwares/auth.middleware";


const router = Router()

router.post('/register', customerChekkerMiddleware.isCustomerValid(), authControllers.register)
router.post('/login',  customerChekkerMiddleware.isCustomerValid(), authControllers.login)
router.post('/refresh',   authMiddleware.checkRefrToken, authControllers.refresh)


export const authRouter = router