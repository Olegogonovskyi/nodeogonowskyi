export interface ICustoner {
    _id?: string,
    email: string
    password: string,
    isVeryied: boolean,
    avatar?: string
}

export interface ICustomerResponse extends Pick<ICustoner, "_id" | "email" | "isVeryied" | "avatar"> {}