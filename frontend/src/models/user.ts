export interface User {
    id: number;
    name: string;
    surnames: string;
    role: string;
    birthdate: string | Date | null;
    email: string;
    currentPassword: string;
    currentPasswordConfirmation: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
