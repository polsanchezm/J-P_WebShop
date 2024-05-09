export interface Register {
    name: string;
    surnames: string;
    birthdate: string | Date | null;
    email: string;
    currentPassword: string;
    currentPasswordConfirmation: string;
}
