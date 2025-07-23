export interface TransactionCreate {
    user: {
        id: number;
    };
    category: {
        id: number;
    };
    bankAccountOrigin: {
        id: number;
    };
    bankAccountDestination: {
        id: number;
    } | null;
    description: string;
    amount: number;
    date: Date;
}