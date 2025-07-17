import { UserInterface } from "../../user/interface/user.interface";

export interface BankAccountInterface {
    id: number;
    user: UserInterface;
    name: string;
    typeAccount: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
}