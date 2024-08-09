import {Router} from "express";
import {userControllers} from "../controllers/userControllers";
import {idChekkerMiddleware} from "../middelwares/id.chekker.middleware";
import {bodyCheckerMiddleware} from "../middelwares/body.checker.middleware";
import {authMiddleware} from "../middelwares/auth.middleware";
import {commonMiddleware} from "../middelwares/commonMiddleware";
import {CustomerValidator} from "../validators/customerValidator";

const router = Router()

router.get('/', authMiddleware.checkAccesToken, commonMiddleware.isQueryValid(CustomerValidator.getList), userControllers.getAll)
router.get('/customers', authMiddleware.checkAccesToken, commonMiddleware.isQueryValid(CustomerValidator.getList), userControllers.getAllCustomers)
router.post('/', authMiddleware.checkAccesToken, bodyCheckerMiddleware.isBodyValid(false), userControllers.create)
router.get('/:id', authMiddleware.checkAccesToken, idChekkerMiddleware.isIdValid('id'), userControllers.getById)
router.delete('/:id', authMiddleware.checkAccesToken,idChekkerMiddleware.isIdValid('id'), userControllers.deleteUser)
router.put('/:id', authMiddleware.checkAccesToken, idChekkerMiddleware.isIdValid('id'), bodyCheckerMiddleware.isBodyValid(true), userControllers.put)



export const userRouter = router