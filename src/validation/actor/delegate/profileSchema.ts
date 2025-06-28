// src/validation/actor/delegate/profileSchema.ts
import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { GENDER, MATERIAL_STATUS } from '@/content/actor/delegate/profile-form';

export const delegateProfileSchema = z.object({
    avatar: z.string().optional().nullable(),
    name: z
        .string({ required_error: 'الاسم مطلوب' })
        .min(2, { message: 'الاسم يجب أن يحتوي على 2 أحرف على الأقل' }),
    idNumber: z
        .number({ invalid_type_error: 'رقم الهوية يجب أن يكون رقمًا' })
        .refine(
            (val) => val.toString().length === 9,
            { message: 'رقم الهوية يجب أن يتكون من 9 أرقام بالضبط' }
        ),
    // gender: z.enum(['male', 'female'], { message: 'يجب اختيار الجنس' }),
    gender: z.nativeEnum(GENDER, { message: 'يجب اختيار الجنس' }),
    maritalStatus: z.nativeEnum(MATERIAL_STATUS, {
        message: 'يجب اختيار الحالة الاجتماعية',
    }),
    // maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
    //     message: 'يجب اختيار الحالة الاجتماعية',
    // }),
    nationality: z
        .string({ required_error: 'الجنسية مطلوبة' })
        .min(2, { message: 'الجنسية يجب أن تحتوي على 2 أحرف على الأقل' }),
    email: z
        .string({ required_error: 'البريد الإلكتروني مطلوب' })
        .email({ message: 'البريد الإلكتروني غير صالح' }),
    age: z
        .number({ invalid_type_error: 'العمر يجب أن يكون رقمًا' })
        .int()
        .min(18, { message: 'يجب أن يكون العمر 18 عامًا على الأقل' })
        .max(100, { message: 'العمر غير صالح' }),
    education: z
        .string({ required_error: 'المؤهل العلمي مطلوب' })
        .min(2, { message: 'المؤهل العلمي يجب أن يحتوي على 2 أحرف على الأقل' }),
    mobileNumber: z
        .string({ required_error: 'رقم الجوال مطلوب' })
        .min(1, { message: 'رقم الجوال مطلوب' })
        .refine(isValidPhoneNumber, { message: 'رقم الجوال غير صالح' })
        .transform((val) => (val === '' ? undefined : val)),
    alternativeNumber: z
        .string()
        .refine((val) => val === '' || isValidPhoneNumber(val), { message: 'رقم بديل غير صالح' })
        .transform((val) => (val === '' ? undefined : val))
        .optional()
        .nullable(),
    // These fields are read-only and not part of the update payload, but needed for initial values
    numberOfResponsibleCamps: z.number().int().min(0),
    numberOfFamilies: z.number().int().min(0),
});

export type delegateProfileType = z.infer<typeof delegateProfileSchema>;

// Define a type for the update payload, excluding read-only fields
export type delegateUpdatePayload = Omit<delegateProfileType, 'numberOfResponsibleCamps' | 'numberOfFamilies'>;