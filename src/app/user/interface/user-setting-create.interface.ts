export interface UserSettingCreate {
    user: {
        id: number
    },
    language: string;
    currency: string;
    theme: string;
    notifications: boolean;
}