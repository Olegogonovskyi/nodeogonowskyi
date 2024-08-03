import dayjs, {ManipulateType} from "dayjs";

class CronHelper {
    public  getDateParams (dateParams: string): [number, ManipulateType] {
        const [limit, essence] = dateParams.split(" ")
        return [+limit, essence as ManipulateType]
    }
    public subtractDays (limit: number, essence: ManipulateType): Date {
       return  dayjs().subtract(limit, essence).toDate();
    }
}

export const cronHelper = new CronHelper()