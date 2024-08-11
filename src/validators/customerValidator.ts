import joi from "joi";
import {OrderEnum} from "../enums/order.enum";
import {UserListEnum} from "../enums/UserList.enum";


export class ItemValidator {
    public static getListCustomers = joi.object({
        limit: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim(),

    })
    public static getListUsers = ItemValidator.getListCustomers.keys({
        sort: joi.string().valid(...Object.values(OrderEnum)).default(OrderEnum.ASC),
        sortBy: joi.string().valid(...Object.values(UserListEnum)).default(UserListEnum.AGE)
    });
}