import { BankAccountInterface } from "../../bank/interface/bank-account.interface";
import { CategoryInterface } from "../../category/interface/category.interface";

export interface TransactionPagination {
    id: number;
    category: CategoryInterface;
    bankAccountOrigin: BankAccountInterface;
    bankAccountDestination: BankAccountInterface;
    description: string;
    amount: number;
    date: Date;
    enabled: boolean;
}