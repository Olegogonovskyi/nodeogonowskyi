import {OrderEnum} from "../enums/order.enum";
import {UserListEnum} from "../enums/UserList.enum";

export interface IUserListQuery {
    limit?: number,
    page?: number,
    search?: string,
    sort?: OrderEnum,
    sortBy?: UserListEnum
}