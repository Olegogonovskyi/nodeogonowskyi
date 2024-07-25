import {tokensRepository} from "../repository/tokensRepository";
import {emailService} from "./email.service";
import {EmailEnum} from "../enums/emailEnam";
import {customerRepository} from "../repository/customerRepository";
import {ApiErrors} from "../errors/error.api.service";

class LogoutService {
   public async logout(header: string) {
       try {
           const token = header.split("Bearer ")[1];
           const {_userId} = await tokensRepository.findByTokenParams({accesstoken: token})
           const {email} = await customerRepository.findByParams({_id: _userId})
           await tokensRepository.deleteTokens({accesstoken: token})
           await emailService.sendEmail(EmailEnum.GOODBYE, email, {name: email})
               } catch (e) {
                   throw new ApiErrors('something wrong with logout', 400)
               }
   }
}

export const logoutService = new LogoutService()