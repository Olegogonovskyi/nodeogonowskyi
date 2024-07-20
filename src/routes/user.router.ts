import {Router} from "express";
import {userControllers} from "../controllers/userControllers";
import {idChekkerMiddleware} from "../middelwares/id.chekker.middleware";
import {bodyCheckerMiddleware} from "../middelwares/body.checker.middleware";

const router = Router()

router.get('/', userControllers.getAll)
router.post('/', bodyCheckerMiddleware.isBodyValid(false), userControllers.create)
router.get('/:id', idChekkerMiddleware.isIdValid('id'), userControllers.getById)
router.delete('/:id', idChekkerMiddleware.isIdValid('id'), userControllers.deleteUser)
router.put('/:id', idChekkerMiddleware.isIdValid('id'), bodyCheckerMiddleware.isBodyValid(true), userControllers.put)


export const userRouter = router