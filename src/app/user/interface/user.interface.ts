import { CountryInterface } from "./country.interface";

export interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    country: CountryInterface;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
}