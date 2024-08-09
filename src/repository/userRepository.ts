import {IUser} from "../interfaces/IUser";
import {ApiErrors} from "../errors/error.api.service";
import {UserModel} from "../models/user.model";
import {IUserListQuery} from "../interfaces/IUserListQuery";
import {FilterQuery} from "mongoose";


class UserRepository {
    public async getAll(query: IUserListQuery): Promise<[IUser[], number]> {
        const skip = (query.page - 1) * query.limit;
        const filterObj: FilterQuery<IUser> = {}
        if (query.search) {
            filterObj.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { superpowers: { $regex: query.search, $options: "i" } },
            ]
        }
        return  await Promise.all([
            UserModel.find(filterObj).limit(query.limit).skip(skip),
            UserModel.countDocuments(filterObj)
        ])
    }

    public async create(newUser: IUser): Promise<any> {
        return await UserModel.create(newUser)
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