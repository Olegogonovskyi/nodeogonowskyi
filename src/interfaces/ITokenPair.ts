import {IUser} from "./IUser";

export interface ITokenPair {
    _id?: string
    accesstoken: string,
    refreshtoken: string
    _userId: string | IUser;
}