import { z } from "zod";

export const otpSchema = z.object({
    otp: z
        .string()
        .length(4, 'رمز التحقق غير صالح')
        .regex(/^\d{4}$/, 'رمز التحقق غير صالح')
        .refine((val) => val.length === 4, {
            message: 'يجب إدخال 4 أرقام',
        }),
})

export type otpType = z.infer<typeof otpSchema>;
