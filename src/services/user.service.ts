import {IUser} from "../intwrfaces/IUser";
import {userRepository} from "../repository/userRepository";

class UserService {
    public async getAll():  Promise<IUser[]> {
        return await userRepository.getAll()
    }
    public async create(newUser: IUser) {
        return await userRepository.create(newUser)
    }
    public async findById(id: string): Promise<IUser> {
        return await userRepository.findById(id)
    }
    public async put(id: string, userToChange: IUser) {
        return await userRepository.put(id, userToChange)
    }
    public async delete(id: string) {
        return await userRepository.delete(id)
    }
}

export const userService = new UserService()