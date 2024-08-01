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
    public async putChanges(id: string, params: Partial<ICustoner>){
        await customerModel.findOneAndUpdate({_id: id}, params)
    }
    public async pushToPasswords(lastPasswors: string) {

    }

}

export const customerRepository = new CustomerRepository()