
import {fsService} from "../fsService";
import {IUser} from "../interfaces/IUser";
import {ApiErrors} from "../errors/error.api.service";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await fsService.getAll()
    }
    public async create(newUser:IUser): Promise<IUser> {
        const users = await fsService.getAll()

        const user = {
            id: users[users.length - 1].id + 1,
            name: newUser.name,
            email: newUser.email
        }
        users.push(user)
        await fsService.write(users)
        return user
    }
    public async getById(userId: number): Promise<IUser> {
        const users = await fsService.getAll()
        const user = users.find((value) => value.id === userId)
        if (!user) {
            throw new ApiErrors('No user with this id', 400)
        }
        return user
    }
}

export const userRepository = new UserRepository()