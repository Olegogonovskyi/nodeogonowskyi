import {IUser} from "../interfaces/IUser";
import {fsService} from "../fsService";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await fsService.getAll()
    }
}

export const userRepository = new UserRepository()