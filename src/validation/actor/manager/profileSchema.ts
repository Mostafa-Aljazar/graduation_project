import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

// Define the schema for the form
export const managerProfileSchema = z.object({
    avatar: z.instanceof(File).optional().nullable(),
    name: z
        .string({ required_error: 'الاسم مطلوب' })
        .min(2, { message: 'الاسم يجب أن يحتوي على 2 أحرف على الأقل' }),
    idNumber: z
        .number({ invalid_type_error: 'رقم الهوية يجب أن يكون رقمًا' })
        .refine(
            (val) => val.toString().length === 9,
            { message: 'رقم الهوية يجب أن يتكون من 9 أرقام بالضبط' }
        ),
    gender: z.enum(['male', 'female'], { message: 'يجب اختيار الجنس' }),
    maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
        message: 'يجب اختيار الحالة الاجتماعية',
    }),
    nationality: z
        .string({ required_error: 'الجنسية مطلوبة' })
        .min(2, { message: 'الجنسية يجب أن تحتوي على 2 أحرف على الأقل' }),
    email: z
        .string({ required_error: 'البريد الإلكتروني مطلوب' })
        .email({ message: 'البريد الإلكتروني غير صالح' }),
    birthDate: z.date().nullable(), // Nullable and optional
    mobileNumber: z
        .string({ required_error: 'رقم الجوال مطلوب' })
        .min(1, { message: 'رقم الجوال مطلوب' })
        .refine(isValidPhoneNumber, { message: 'رقم الجوال غير صالح' })
        .transform((val) => (val === '' ? undefined : val)),
    alternativeNumber: z
        .string({ required_error: 'رقم الجوال مطلوب' })
        .refine(isValidPhoneNumber, { message: 'رقم بديل غير صالح' })
        .transform((val) => (val === '' ? undefined : val)),

});

// TypeScript type inferred from Zod schema
export type managerProfileType = z.infer<typeof managerProfileSchema>;
