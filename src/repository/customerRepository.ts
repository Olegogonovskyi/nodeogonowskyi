import {ICustoner} from "../interfaces/ICustoner";
import {customerModel} from "../models/customer.model";

class CustomerRepository {
    public async getAll(): Promise<ICustoner[]> {
        return  await customerModel.find()
    }

    public async create(newUser: ICustoner): Promise<any> {
        return await customerModel.create(newUser)
    }
    public async findByParams(params: Partial<ICustoner>): Promise<ICustoner> {
        return await customerModel.findOne(params)
    }
    //
    // public async getById(userId: string): Promise<IUser> {
    //     const user = await UserModel.findById(userId)
    //     if (!user) {
    //         throw new ApiErrors('No user with this id', 400)
    //     }
    //     return user
    // }
    //
    // public async delete(userId: string) {
    //     await UserModel.findByIdAndDelete(userId, {})
    // }
    //
    // public async put(userID: string, userToChange: IUser): Promise<void> {
    //     await UserModel.findByIdAndUpdate(userID, {...userToChange}, {})
    //
    // }
}

export const customerRepository = new CustomerRepository()