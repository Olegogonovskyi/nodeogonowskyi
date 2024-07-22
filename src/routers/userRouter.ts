import {Router} from 'express'
import {userController} from "../controllers/user.controller";

const router = Router()

router.get('/', userController.getAll)
router.post('/', userController.create)
router.get('/:id', userController.findById)
router.put('/:id', userController.put)
router.delete('/:id', userController.delete)

export const userRouter = router