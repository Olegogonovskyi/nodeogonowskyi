
import {IUserListQuery} from "./IUserListQuery";

export interface IResponseToCustomer<T> extends IUserListQuery {
    data: T,
    total: number
}