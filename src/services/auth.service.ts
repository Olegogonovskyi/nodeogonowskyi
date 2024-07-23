import {IUser} from "../interfaces/IUser";
import {userRepository} from "../repository/userRepository";
import {customerRepository} from "../repository/customerRepository";
import {ICustoner} from "../interfaces/ICustoner";
import {ApiErrors} from "../errors/error.api.service";
import {passwordService} from "./passwordService";

class AuthService {
    public async register(customer: ICustoner): Promise<any> {
        const {email, password} = customer
        await this.isEmailDuplicate(email)

        const hashPassword = await passwordService.hash(password)

        const newCustomer = await customerRepository.create({...customer, password: hashPassword})



    }
    public async isEmailDuplicate(email: string): Promise<void> {
        const customer = await customerRepository.findByParams(email)
        if (customer) {
            throw new ApiErrors("Email already exists", 409)
        }
    }
}

export const authService = new AuthService()