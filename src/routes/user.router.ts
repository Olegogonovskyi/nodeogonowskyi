import {Router} from "express";
import {userControllers} from "../controllers/userControllers";
import {idChekkerMiddleware} from "../middelwares/id.chekker.middleware";
import {bodyCheckerMiddleware} from "../middelwares/body.checker.middleware";
import {authMiddleware} from "../middelwares/auth.middleware";

const router = Router()

router.get('/', authMiddleware.checkAccesToken, userControllers.getAll)
router.post('/', authMiddleware.checkAccesToken, bodyCheckerMiddleware.isBodyValid(false), userControllers.create)
router.get('/:id', authMiddleware.checkAccesToken, idChekkerMiddleware.isIdValid('id'), userControllers.getById)
router.delete('/:id', authMiddleware.checkAccesToken,idChekkerMiddleware.isIdValid('id'), userControllers.deleteUser)
router.put('/:id', authMiddleware.checkAccesToken, idChekkerMiddleware.isIdValid('id'), bodyCheckerMiddleware.isBodyValid(true), userControllers.put)



export const userRouter = router