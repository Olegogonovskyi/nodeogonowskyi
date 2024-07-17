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
    public async getById(userID: number): Promise<IUser> {
        return await userRepository.getById(userID)
    }
    public async delete(userID: number) {
        return await userRepository.delete(userID)
    }
    public async put(userToChange: IUser): Promise<IUser> {
        return await userRepository.put(userToChange)
    }
}

export const userService = new UserService()