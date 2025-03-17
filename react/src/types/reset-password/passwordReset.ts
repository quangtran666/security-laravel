import {z} from "zod";

export const PasswordResetSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export type PasswordResetType = z.infer<typeof PasswordResetSchema>