import {delOldPasswordsCron} from "./remove-old-hasedPasswords";
import {removeOldCrons} from "./remove-old-crons";

export const cronRunner = () => {
    delOldPasswordsCron.start()
    removeOldCrons.start()
}