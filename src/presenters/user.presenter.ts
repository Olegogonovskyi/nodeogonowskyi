import {ICustoner} from "../interfaces/ICustoner";
import {configs} from "../configs/config";

export class UserPresenter {
    public static toResponse(data: ICustoner) {
        return {
            _id: data._id,
            email: data.email,
            isVeryied: data.isVeryied,
            avatar: data.avatar ? `${configs.AWS_ENDPOINT_URL}/${configs.AWC_BUCKET_NAME}/${data.avatar}` : null
        }
    }
}