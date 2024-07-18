import {fsService} from "../fsService/fsservice";
import {IUser} from "../interfaces/IUser";

class UsersRepository {
    public async getAll(): Promise<IUser[]> {
        return await fsService.read()
    }
}

export const userRepo = new UsersRepository()