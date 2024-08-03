import {delOldPasswordsCron} from "./remove-old-hasedPasswords";

export const cronRunner = () => {
    delOldPasswordsCron.start()
}