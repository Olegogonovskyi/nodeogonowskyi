import {Router} from "express";
import {authControllers} from "../controllers/authControllers";
import {customerChekkerMiddleware} from "../middelwares/customer.chekker.middleware";

const router = Router()

router.post('/register', customerChekkerMiddleware.isCustomerValid(), authControllers.register)


export const authRouter = router