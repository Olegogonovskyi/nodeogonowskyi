import {IUser} from "../interfaces/IUser";
import {userRepository} from "../repository/userRepository";

class UserService {
    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll()
    }
}

export const userService = new UserService()