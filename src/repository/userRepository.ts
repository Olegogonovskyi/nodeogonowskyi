
import {fsService} from "../fsService";
import {IUser} from "../interfaces/IUser";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await fsService.getAll()
    }
    public async create(newUser:IUser ): Promise<IUser> {
        const users = await fsService.getAll()
        // const {name, email} = newUser
        const user = {
            id: users[users.length - 1].id + 1,
            name: newUser.name,
            email: newUser.email
        }
        users.push(user)
        await fsService.write(users)
        return user
    }
}

export const userRepository = new UserRepository()