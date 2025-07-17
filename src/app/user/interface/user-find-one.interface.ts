import { CountryInterface } from "./country.interface";

export interface UserFindOne {
    id: number;
    firstName: string;
    lastName: string;
    country: CountryInterface;
    email: string;
    username: string;
    enabled: boolean
}