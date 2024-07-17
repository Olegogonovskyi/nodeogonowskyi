import {IUser} from "../interfaces/IUser";
import {userRepository} from "../repository/userRepository";

class UserService {
    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll()
    }
    public async create(newUser: IUser): Promise<IUser> {
        // const {name, email} = newUser
        // check
        return await userRepository.create(newUser)
    }
}

export const userService = new UserService()