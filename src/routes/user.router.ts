import {Router} from "express";
import {userControllers} from "../controllers/userControllers";

const router = Router()

router.get('/', userControllers.getAll)
router.post('/', userControllers.create)
router.get('/:id', userControllers.getById)
router.delete('/:id', userControllers.deleteUser)


export const userRouter = router