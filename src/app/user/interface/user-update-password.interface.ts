export interface UserUpdatePassword {
    id: number;
    password: string;
    newPassword: string;
    confirmPassword: string;
}