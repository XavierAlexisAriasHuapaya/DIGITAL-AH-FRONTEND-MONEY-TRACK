import { UserFindOne } from "./user-find-one.interface";

export interface UserSettingFindOne {
    id: number;
    user: UserFindOne,
    language: string;
    currency: string;
    theme: string;
    notificacion: boolean;
}