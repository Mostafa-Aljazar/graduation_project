import { z } from "zod";

// Zod schema for form validation
export const contactUsSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: 'الاسم يجب أن يكون 2 أحرف على الأقل' })
        .trim(),
    lastName: z
        .string()
        .min(2, { message: 'اللقب يجب أن يكون 2 أحرف على الأقل' })
        .trim(),
    email: z.string().email({ message: 'البريد الإلكتروني غير صالح' }).trim(),
    address: z
        .string()
        .min(5, { message: 'العنوان يجب أن يكون 5 أحرف على الأقل' })
        .trim(),
    message: z
        .string()
        .min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل' })
        .trim(),
});

// TypeScript type inferred from Zod schema
export type contactUsType = z.infer<typeof contactUsSchema>;
