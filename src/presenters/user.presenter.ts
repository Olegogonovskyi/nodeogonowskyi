import {ICustomerResponse, ICustoner} from "../interfaces/ICustoner";
import {configs} from "../configs/config";
import {IUserListQuery} from "../interfaces/IUserListQuery";
import {IResponseToCustomer} from "../interfaces/IResponseToCustomer";

export class UserPresenter {
    public static toResponse(data: ICustoner): ICustomerResponse {
        return {
            _id: data._id,
            email: data.email,
            isVeryied: data.isVeryied,
            avatar: data.avatar ? `${configs.AWS_ENDPOINT_URL}/${configs.AWC_BUCKET_NAME}/${data.avatar}` : null
        }
    }

    public static responseToCustomer<T>(data: T, total: number, query: IUserListQuery): IResponseToCustomer<T> {
        return {
            data,
            total,
            ...query
        }
    }
}