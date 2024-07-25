import {EmailEnum} from "../enums/emailEnam";


export const emailConstant = {
    [EmailEnum.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },

    [EmailEnum.OLD_VISIT]: {
        subject: "Forgot password",
        template: "old-visit",
    },
    [EmailEnum.GOODBYE]: {
        subject: "Bye",
        template: "goodbye",
    }
};