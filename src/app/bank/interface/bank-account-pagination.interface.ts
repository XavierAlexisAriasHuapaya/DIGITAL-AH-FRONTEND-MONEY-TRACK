import { TypeAccount } from "../enum/type-account.enum";

export interface BankAccountPagination {
    id: number;
    typeAccount: TypeAccount;
    name: string;
    createdAt: Date;
    enabled: boolean
}