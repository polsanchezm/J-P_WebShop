export interface User {
    id: number;
    name: string;
    surnames: string;
    birthdate: Date | null;
    email: string;
    password: string;
    password_confirmation: string;
}
