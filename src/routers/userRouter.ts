import {Router} from 'express'
import {userController} from "../controllers/user.controller";
import {bodyChecker} from "../middelwares/body.checker";
import {idChekkerMiddleware} from "../middelwares/id.checker";

const router = Router()

router.get('/', userController.getAll)
router.post('/', bodyChecker.isBodyValid(), userController.create)
router.get('/:id', idChekkerMiddleware.isIdValid('id'), userController.findById)
router.put('/:id', idChekkerMiddleware.isIdValid('id'), bodyChecker.isBodyValid(), userController.put)
router.delete('/:id', idChekkerMiddleware.isIdValid('id'), userController.delete)

export const userRouter = router