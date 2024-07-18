import {userRepo} from "../repositires/usersRepository";
import {IUser} from "../interfaces/IUser";

class UsersService {
    public async getAll(): Promise<IUser[]> {
        return await userRepo.getAll()
    }
}

export const userService = new UsersService()