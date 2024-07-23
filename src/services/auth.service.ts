import {customerRepository} from "../repository/customerRepository";
import {ICustoner} from "../interfaces/ICustoner";
import {ApiErrors} from "../errors/error.api.service";
import {passwordService} from "./passwordService";
import {tokenService} from "./token.service";
import {tokensRepository} from "../repository/tokensRepository";
import {ITokenPairGenre} from "../interfaces/ITokenPairGenre";

class AuthService {
    public async register(customer: ICustoner): Promise<{ newCustomer: ICustoner, tokens: ITokenPairGenre }> {
        const {email, password} = customer
        await this.isEmailDuplicate(email)

        const hashPassword = await passwordService.hash(password)

        const newCustomer = await customerRepository.create({...customer, password: hashPassword})

        const tokens = await tokenService.generePair({idUser: newCustomer._id})

        await tokensRepository.create({...tokens, _userId: newCustomer._id})

        return {newCustomer, tokens}
    }

    public async login(customer: ICustoner) {
        const {email, password} = customer

        const customerFromDb = await customerRepository.findByParams({email})
                if (!customerFromDb) {
            throw new ApiErrors("Invalid credentials", 401);
        }

        const passwordChekker = await passwordService.compare(password, customerFromDb.password)
        if (!passwordChekker) {
            throw new ApiErrors("Invalid credentials", 401);
        }

        const prewToken = await tokensRepository.findByTokenParams({_userId: customerFromDb._id})

        if (prewToken) {
            await tokensRepository.deleteTokens({_userId: customerFromDb._id})
            console.log('isPrew')
        }

        const tokens = await tokenService.generePair({idUser: customerFromDb._id})

        await tokensRepository.create({...tokens, _userId: customerFromDb._id})

        return {customer, tokens}
    }

    public async isEmailDuplicate(email: string): Promise<void> {
        const customer = await customerRepository.findByParams({email})
        if (customer) {
            throw new ApiErrors("Email already exists", 409)
        }
    }
}

export const authService = new AuthService()