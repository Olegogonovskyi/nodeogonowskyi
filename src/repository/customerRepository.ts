import {ICustoner} from "../interfaces/ICustoner";
import {customerModel} from "../models/customer.model";

class CustomerRepository {
    public async getAll(): Promise<ICustoner[]> {
        return await customerModel.find()
    }

    public async create(newUser: ICustoner): Promise<ICustoner> {
        return await customerModel.create(newUser)
    }

    public async findByParams(params: Partial<ICustoner>): Promise<ICustoner> {
        return await customerModel.findOne(params)
    }

    public async putChanges(id: string, params: Partial<ICustoner>): Promise<ICustoner> {
       return  await customerModel.findOneAndUpdate({_id: id}, params, {
           returnDocument: "after",
       })
    }
}

export const customerRepository = new CustomerRepository()