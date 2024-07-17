import {IServise} from "../../interfaces/IServise";
import {userService} from "../../services/user.service";


class UserControllers {
    public async getAll(props: IServise) {
        const {res, next} = props
        try {
            const result = await userService.getAll()
            res.json(result)
        } catch (e) {
            next(e)
        }

    }
}

export const userControllers = new UserControllers()