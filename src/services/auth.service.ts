import {customerRepository} from "../repository/customerRepository";
import {ICustoner} from "../interfaces/ICustoner";
import {ApiErrors} from "../errors/error.api.service";
import {passwordService} from "./passwordService";
import {tokenService} from "./token.service";
import {tokensRepository} from "../repository/tokensRepository";
import {ITokenPairGenre} from "../interfaces/ITokenPairGenre";
import {ITokenPayload} from "../interfaces/ITokenPayload";
import {emailService} from "./email.service";
import {EmailEnum} from "../enums/emailEnam";

class AuthService {
    public async register(customer: ICustoner): Promise<{ newCustomer: ICustoner, tokens: ITokenPairGenre }> {
        const {email, password} = customer
        console.log(21)
        await this.isEmailDuplicate(email)
console.log(22)
        const hashPassword = await passwordService.hash(password)
console.log(23)
        const newCustomer = await customerRepository.create({...customer, password: hashPassword})
console.log(24)
        const tokens = await tokenService.generePair({idUser: newCustomer._id})
console.log(25)
        await tokensRepository.create({...tokens, _userId: newCustomer._id})
console.log(26)
        await emailService.sendEmail(EmailEnum.WELCOME, email, {name: email})
console.log(27)
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

        }

        const tokens = await tokenService.generePair({idUser: customerFromDb._id})

        await tokensRepository.create({...tokens, _userId: customerFromDb._id})

        return {customer, tokens}
    }

    public async refresh(jwtPayload: ITokenPayload) {

        await tokensRepository.deleteTokens({_userId: jwtPayload.idUser})

        const tokens = await tokenService.generePair({idUser: jwtPayload.idUser})

        await tokensRepository.create({...tokens, _userId: jwtPayload.idUser})

        return tokens

    }

    public async isEmailDuplicate(email: string): Promise<void> {
        const customer = await customerRepository.findByParams({email})
        if (customer) {
            throw new ApiErrors("Email already exists", 409)
        }
    }
}

export const authService = new AuthService()