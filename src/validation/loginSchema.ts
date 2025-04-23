import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({ required_error: 'required ' })
        .email('تنسيق بريد الكتروني خاطئ'),
    password: z
        .string({ required_error: 'required' })
        .min(6, 'تنسيق كلمة مرور خاطئ'),
});

export type loginType = z.infer<typeof loginSchema>;