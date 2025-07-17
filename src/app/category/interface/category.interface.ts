import { UserInterface } from "../../user/interface/user.interface";

export interface CategoryInterface {
    id: number;
    type: string;
    description: string;
    user: UserInterface;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
}