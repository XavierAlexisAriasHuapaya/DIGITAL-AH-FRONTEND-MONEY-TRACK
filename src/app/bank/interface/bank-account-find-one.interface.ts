import { TypeAccount } from "../enum/type-account.enum";

export interface BankAccountFindOne {
    id: number;
    name: string;
    typeAccount: TypeAccount;
    enabled: boolean;
}