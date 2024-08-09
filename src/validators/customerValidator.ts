import joi from "joi";

export class CustomerValidator {
    public static getList = joi.object({
        limit: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim()
    })
}