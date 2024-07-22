import {IUser} from "../intwrfaces/IUser";
import {userWTHpswModel} from "../models/user.model";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return await userWTHpswModel.find()
    }
    public async create(newUser: IUser) {
        return await userWTHpswModel.create(newUser)
    }
    public async findById(id: string): Promise<IUser> {
        return await userWTHpswModel.findById(id)
    }
    public async put(id: string, userToChange: IUser) {
        return await userWTHpswModel.findByIdAndUpdate(id, {...userToChange})
    }
    public async delete(id:string) {
        return await userWTHpswModel.findByIdAndDelete(id)
    }
}

export const userRepository = new UserRepository()