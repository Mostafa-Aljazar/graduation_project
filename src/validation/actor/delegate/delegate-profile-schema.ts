import { z } from 'zod'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { GENDER, SOCIAL_STATUS } from '@/@types/actors/common-types/index.type'

export const delegateProfileSchema = z.object({
    profile_image: z.string().optional().nullable(),

    name: z
        .string({ required_error: 'الاسم مطلوب' })
        .min(2, { message: 'الاسم يجب أن يحتوي على 2 أحرف على الأقل' }),

    identity: z
        .string({ required_error: 'رقم الهوية مطلوب' })
        .refine((val) => /^\d{9}$/.test(val), {
            message: 'رقم الهوية يجب أن يتكون من 9 أرقام بالضبط',
        }),

    gender: z.nativeEnum(GENDER, { required_error: 'الجنس مطلوب' }),

    social_status: z.nativeEnum(SOCIAL_STATUS, {
        required_error: 'الحالة الاجتماعية مطلوبة',
    }),

    nationality: z
        .string({ required_error: 'الجنسية مطلوبة' })
        .min(2, { message: 'الجنسية يجب أن تحتوي على 2 أحرف على الأقل' }),

    email: z
        .string({ required_error: 'البريد الإلكتروني مطلوب' })
        .email({ message: 'البريد الإلكتروني غير صالح' }),

    age: z
        .number({ required_error: 'العمر مطلوب' })
        .int()
        .min(18, { message: 'يجب أن يكون العمر 18 عامًا على الأقل' })
        .max(100, { message: 'العمر غير صالح' }),

    education: z
        .string({ required_error: 'المؤهل العلمي مطلوب' })
        .min(2, { message: 'المؤهل العلمي يجب أن يحتوي على 2 أحرف على الأقل' }),

    phone_number: z
        .string({ required_error: 'رقم الجوال مطلوب' })
        .refine(isValidPhoneNumber, { message: 'رقم الجوال غير صالح' }),

    alternative_phone_number: z
        .string()
        .refine((val) => val === '' || isValidPhoneNumber(val), {
            message: 'رقم بديل غير صالح',
        })
        .transform((val) => (val === '' ? undefined : val))
        .optional()
        .nullable(),

    // number_of_responsible_camps: z.number().int().min(0).optional(),

    // number_of_families: z.number().int().min(0).optional(),
})

export type delegateProfileType = z.infer<typeof delegateProfileSchema>

// export type delegateUpdatePayload = Omit<
//     delegateProfileType,
//     'number_of_responsible_camps' | 'number_of_families'
// >
