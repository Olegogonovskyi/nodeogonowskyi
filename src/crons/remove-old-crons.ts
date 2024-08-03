import dayjs from "dayjs";
import uts from "dayjs/plugin/utc"
import {CronJob} from "cron";
import {cronHelper} from "../helpers/cronHelper";
import {configs} from "../configs/config";
import {tokensRepository} from "../repository/tokensRepository";
import {actionTokensRepository} from "../repository/actionTokensRepository";

dayjs.extend(uts)

const hendler = async () => {
    try {
        const [limitAcces, essenceAcces] = cronHelper.getDateParams(configs.JWT_ACCESS_EXPIRES_IN)
        const bornAccesTokenDay = cronHelper.subtractDays(limitAcces, essenceAcces);
        await tokensRepository.deleteAll({
            createdAt: {$lt: bornAccesTokenDay},
            accesstoken: {$exists: true}

        })
        const [limitRefr, essenceRefr] = cronHelper.getDateParams(configs.JWT_REFRESH_EXPIRES_IN)
        const bornRefrTokenDay = cronHelper.subtractDays(limitRefr, essenceRefr);
        await tokensRepository.deleteAll({
            createdAt: {$lt: bornRefrTokenDay},
            refreshtoken: {$exists: true}

        })
        const [limitVerify, essenceVerify] = cronHelper.getDateParams(configs.JWT_ACTION_VERIFIED_EXPIRES_IN)
        const bornVerifyTokenDay = cronHelper.subtractDays(limitVerify, essenceVerify);
        await actionTokensRepository.deleteTokens({
            createdAt: {$lt: bornVerifyTokenDay},
            actiontoken: {$exists: true}

        })
        // await allPasswordsRepository.deletePasswords({createdAt: {$lt: ninetyDaysAgo}})
    } catch (e) {
        console.error('cron error', e)
    }
}

export const removeOldCrons = new CronJob('0 3 * * *', hendler)