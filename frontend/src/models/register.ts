export interface Register {
    name: string;
    surnames: string;
    birthdate: string | Date;
    email: string;
    currentPassword: string;
    currentPasswordConfirmation: string;
}
