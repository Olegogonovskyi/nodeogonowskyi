import {IUser} from "../interfaces/IUser";
import {userRepository} from "../repository/userRepository";
import {IUserListQuery} from "../interfaces/IUserListQuery";
import {UserPresenter} from "../presenters/user.presenter";
import {IResponseToCustomer} from "../interfaces/IResponseToCustomer";
import {customerRepository} from "../repository/customerRepository";
import {ICustoner} from "../interfaces/ICustoner";

class UserService {
    public async getAll(query: IUserListQuery): Promise<IResponseToCustomer<IUser[]>> {
        const [users, total] = await userRepository.getAll(query)
        return UserPresenter.responseToCustomer<IUser[]>(users, total, query)
    }

    public async getAllCustomers(query: IUserListQuery): Promise<IResponseToCustomer<ICustoner[]>> {
        const [customers, total] = await customerRepository.getAll(query)
        const customersToResponse = [];
        customers.map((customer)=> {customersToResponse.push(UserPresenter.toResponse(customer))})
        return UserPresenter.responseToCustomer<ICustoner[]>(customersToResponse, total, query)
    }

    public async create(newUser: IUser): Promise<IUser> {
        return await userRepository.create(newUser)
    }

    public async getById(userID: string): Promise<IUser> {
        return await userRepository.getById(userID)
    }

    public async delete(userID: string) {
        await userRepository.delete(userID)
    }

    public async put(userID: string, userToChange: IUser): Promise<void> {
        await userRepository.put(userID, userToChange)
    }
}

export const userService = new UserService()