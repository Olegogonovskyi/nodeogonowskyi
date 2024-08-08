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
import {allPasswordsRepository} from "../repository/allPasswordsRepository";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service";

class AuthService {
    public async register(customer: ICustoner): Promise<{ newCustomer: ICustoner, tokens: ITokenPairGenre }> {
        const {email, password} = customer
        await this.isEmailDuplicate(email)
        const hashPassword = await passwordService.hash(password)
        const newCustomer = await customerRepository.create({...customer, password: hashPassword})
        const tokens = await tokenService.generePair({idUser: newCustomer._id})
        await tokensRepository.create({...tokens, _userId: newCustomer._id})
        await allPasswordsRepository.create({password: hashPassword, _userId: newCustomer._id})
        const actionVerToken = await tokenService.genreActionToken({idUser: newCustomer._id}, ActionToknEnam.VERIFIED)
        console.log(actionVerToken)
        await actionTokensRepository.create({
            _userId: newCustomer._id,
            typeofToken: ActionToknEnam.VERIFIED,
            actiontoken: actionVerToken
        })
        await emailService.sendEmail(EmailEnum.WELCOME, email, {
            name: email,
            frontUrl: configs.FRONTEND_URL,
            actionToken: actionVerToken
        })
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

    public async verify(userId: string, actionVerToken: string): Promise<ICustoner> {
        await customerRepository.putChanges(userId, {isVeryied: true})
        await actionTokensRepository.deleteTokens({actiontoken: actionVerToken})
        return await customerRepository.findByParams({_id: userId})
    }

    public async changeAvatar(userId: string, file: UploadedFile): Promise<ICustoner> {
        const customer = await customerRepository.findByParams({_id: userId})
        if (customer.avatar) {
            await s3Service.deleteFile(customer.avatar)
        }
        const newAvatar = await s3Service.uploadFile("customer", userId, file)
        const updCustomer = await customerRepository.putChanges(userId, {avatar: newAvatar})

        return updCustomer
    }

    public async deleteAvatar(customerId: string): Promise<ICustoner> {
        const customer = await customerRepository.findByParams({_id: customerId})

        if ( customer.avatar) {
            await s3Service.deleteFile(customer.avatar)
        }
        return await  customerRepository.putChanges(customerId, {avatar: null})
    }

    public async changePassword(accesToken: string, newPassword: string, oldPassword: string): Promise<string> {
        const {_userId} = await tokensRepository.findByTokenParams({accesstoken: accesToken})
        const {password, isVeryied} = await customerRepository.findByParams({_id: _userId})
        if (!isVeryied) {
            throw new ApiErrors("You must verify!!", 401);
        }
        const passwordChekker = await passwordService.compare(oldPassword, password)
        try {
            if (!passwordChekker) {
                throw new ApiErrors("Invalid credentials", 401);
            }
        } catch (error) {
            console.error(error.message);
            return error.message
        }
        const oldPasswords = await allPasswordsRepository.findAll(_userId)

        for (const oldPass of oldPasswords) {
            const chekker = await passwordService.compare(newPassword, oldPass.password);
            if (chekker) {
                throw new ApiErrors("It was Your old Password", 400);
            }
        }
        const newPasswordHased = await passwordService.hash(newPassword)
        await allPasswordsRepository.create({password: newPasswordHased, _userId: _userId})
        await customerRepository.putChanges(_userId, {password: newPasswordHased})
        await tokensRepository.deleteAll({_userId: _userId})
        return newPasswordHased
    }


    public async isEmailDuplicate(email: string): Promise<void> {
        const customer = await customerRepository.findByParams({email})
        if (customer) {
            throw new ApiErrors("Email already exists", 409)
        }
    }
}

export const authService = new AuthService()