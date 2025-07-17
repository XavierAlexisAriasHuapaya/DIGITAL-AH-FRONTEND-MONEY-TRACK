import { UserInterface } from "../../user/interface/user.interface";
import { TypeMovement } from "../enum/type-movement.enum";

export interface CategoryFindOne {
    id: number;
    type: TypeMovement;
    description: string;
    user: UserInterface;
}