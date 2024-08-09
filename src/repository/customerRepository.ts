import {ICustoner} from "../interfaces/ICustoner";
import {customerModel} from "../models/customer.model";
import {FilterQuery} from "mongoose";
import {IUserListQuery} from "../interfaces/IUserListQuery";

class CustomerRepository {
    public async getAll(query: IUserListQuery): Promise<[ICustoner[], number]> {
        const filterObj: FilterQuery<ICustoner> = {isVeryied: true};
        const skip = (query.page - 1) * query.limit;
        if (query.search) {
            filterObj.$or = [
                {_id: {$regex: query.search, $options: "i"}},
                {email: {$regex: query.search, $options: "i"}},
            ];
        }
        return await Promise.all([
            customerModel.find(filterObj).limit(query.limit).skip(skip),
            customerModel.countDocuments(filterObj),
        ]);
    }

    public async create(newUser: ICustoner): Promise<ICustoner> {
        return await customerModel.create(newUser)
    }

    public async findByParams(params: Partial<ICustoner>): Promise<ICustoner> {
        return await customerModel.findOne(params)
    }

    public async putChanges(id: string, params: Partial<ICustoner>): Promise<ICustoner> {
        return await customerModel.findOneAndUpdate({_id: id}, params, {
            returnDocument: "after",
        })
    }
}

export const customerRepository = new CustomerRepository()