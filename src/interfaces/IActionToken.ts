import {ActionToknEnam} from "../enums/actionToknEnam";

export interface IActionToken {
    _id?: string
    actiontoken: string,
    typeofToken: ActionToknEnam
    _userId: string;
}