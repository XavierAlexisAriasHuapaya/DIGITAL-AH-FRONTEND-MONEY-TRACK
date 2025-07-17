import { UserInterface } from "../../user/interface/user.interface";
import { TypeAccount } from "../enum/type-account.enum";

export interface BankAccountUpdate {
    id: number;
    typeAccount: string;
    name: string;
}