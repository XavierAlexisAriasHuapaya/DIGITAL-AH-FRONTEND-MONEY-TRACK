import { CountryInterface } from "./country.interface";

export interface UserUpdate {
    id: number;
    firstName: string;
    lastName: string;
    country: {
        id: number;
    };
}