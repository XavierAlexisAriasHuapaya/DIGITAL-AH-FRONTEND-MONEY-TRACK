import { BankAccountFindOne } from "../../bank/interface/bank-account-find-one.interface";
import { CategoryFindOne } from "../../category/interface/category-find-one.interface";
import { UserFindOne } from "../../user/interface/user-find-one.interface";

export interface TransactionFindOne {
    id: number;
    user: UserFindOne;
    category: CategoryFindOne;
    bankAccountOrigin: BankAccountFindOne;
    bankAccountDestination: BankAccountFindOne;
    description: string;
    amount: number;
    date: Date;
}