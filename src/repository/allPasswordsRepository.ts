import {FilterQuery} from "mongoose";
import {IAllPaswords} from "../interfaces/IAllPaswords";
import {allPasswordmodel} from "../models/AllPasswords.model";

class AllPasswordsRepository {

    public async create(hasedPassword: IAllPaswords) {
        await allPasswordmodel.create(hasedPassword)
    }

    public async findAll(userId: string): Promise<IAllPaswords[]> {
        return await allPasswordmodel.find({_userId: userId})
    }

    public async deletePasswords(params: FilterQuery<IAllPaswords>) {
        await allPasswordmodel.deleteMany(params)
    }

}

export const allPasswordsRepository = new AllPasswordsRepository()