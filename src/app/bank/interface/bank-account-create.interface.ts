import { User } from "../../authentication/interface/user.interface";
import { UserInterface } from "../../user/interface/user.interface";
import { TypeAccount } from "../enum/type-account.enum";

export interface BankAccountCreate {
    typeAccount: string;
    name: string;
    user: User;
}