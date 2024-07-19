import {IUser} from "../interfaces/IUser";
import {ApiErrors} from "../errors/error.api.service";
import {UserModel} from "../models/user.model";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return  UserModel.find()
    }

    public async create(newUser: IUser): Promise<any> {
        return UserModel.create({...newUser})
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await UserModel.findById(userId)
        if (!user) {
            throw new ApiErrors('No user with this id', 400)
        }
        return user
    }

    public async delete(userId: string) {
        await UserModel.findByIdAndDelete(userId, {})
    }

    public async put(userID: string, userToChange: IUser): Promise<void> {
        await UserModel.findByIdAndUpdate(userID, {...userToChange}, {})

    }
}

export const userRepository = new UserRepository()