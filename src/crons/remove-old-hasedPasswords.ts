import dayjs from "dayjs";
import uts from "dayjs/plugin/utc"
import {allPasswordsRepository} from "../repository/allPasswordsRepository";
import {CronJob} from "cron";

dayjs.extend(uts)

const hendler = async () => {
    try {
        const ninetyDaysAgo = dayjs().subtract(90, 'days').toDate();
        await allPasswordsRepository.deletePasswords({createdAt: {$lt: ninetyDaysAgo}})
    } catch (e) {
        console.error('cron error', e)
    }
}

export const delOldPasswordsCron = new CronJob('0 3 * * *', hendler)