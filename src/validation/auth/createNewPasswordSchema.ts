import { z } from "zod";

// Define the form schema with static error messages
export const createNewPasswordSchema = z
    .object({
        password: z
            .string({ required_error: 'الحقل مطلوب' })
            .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'كلمات المرور غير متطابقة',
        path: ['confirm_password'],
    });

export type createNewPasswordType = z.infer<typeof createNewPasswordSchema>;
