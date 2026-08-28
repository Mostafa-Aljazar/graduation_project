import { z } from "zod";

export const forgetPasswordSchema = z.object({
    email: z
        .string({ required_error: 'الحقل مطلوب' })
        .email('البريد الإلكتروني غير صالح'),
});

export type forgetPasswordType = z.infer<typeof forgetPasswordSchema>;
