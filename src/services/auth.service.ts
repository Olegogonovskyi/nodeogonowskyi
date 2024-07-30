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
import {ActionToknEnam} from "../enums/actionToknEnam";
import {configs} from "../configs/config";
import {actionTokensRepository} from "../repository/actionTokensRepository";

class AuthService {
    public async register(customer: ICustoner): Promise<{ newCustomer: ICustoner, tokens: ITokenPairGenre }> {
        const {email, password} = customer
        await this.isEmailDuplicate(email)
        console.log(1)
        const hashPassword = await passwordService.hash(password)
        console.log(2)
        const newCustomer = await customerRepository.create({...customer, password: hashPassword})
        console.log(3)
        const tokens = await tokenService.generePair({idUser: newCustomer._id})
        console.log(4)
        await tokensRepository.create({...tokens, _userId: newCustomer._id})
        console.log(5)
        const actionVerToken = await tokenService.genreActionToken({idUser: newCustomer._id}, ActionToknEnam.VERIFIED)
        console.log(6)
        console.log(actionVerToken)
        await actionTokensRepository.create({_userId: newCustomer._id, typeofToken: ActionToknEnam.VERIFIED, actiontoken: actionVerToken})
        console.log(7)
        await emailService.sendEmail(EmailEnum.WELCOME, email, {name: email, frontUrl: configs.FRONTEND_URL, actionToken: actionVerToken})
        console.log(8)
        return {newCustomer, tokens}
    }

    public async login(customer: ICustoner): Promise<{ customer: ICustoner, tokens: ITokenPairGenre }> {
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

    public async refresh(jwtPayload: ITokenPayload): Promise<ITokenPairGenre> {
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