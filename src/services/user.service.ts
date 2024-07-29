import {IUser} from "../interfaces/IUser";
import {userRepository} from "../repository/userRepository";

class UserService {
    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll()
    }

    public async create(newUser: IUser): Promise<IUser> {
        return await userRepository.create(newUser)
    }

    public async getById(userID: string): Promise<IUser> {
        return await userRepository.getById(userID)
    }

    public async delete(userID: string) {
        await userRepository.delete(userID)
    }

    public async put(userID: string, userToChange: IUser): Promise<void> {
        await userRepository.put(userID, userToChange)
    }
}

export const userService = new UserService()