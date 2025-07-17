import { User } from "../../authentication/interface/user.interface";

export interface CategoryCreate {
    type: string;
    description: string;
    user: User;
}