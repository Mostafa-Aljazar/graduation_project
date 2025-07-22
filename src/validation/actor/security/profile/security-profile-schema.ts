import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import {
    GENDER,
    SOCIAL_STATUS,
    AGES,
    ACCOMMODATION_TYPE,
    FAMILY_STATUS_TYPE,
} from '@/@types/actors/common-types/index.type';
import { USER_RANK } from '@/constants/userTypes';


export const SecurityProfileSchema = z.object({
    profile_image: z.string().optional().nullable(),
    name: z
        .string({ required_error: 'الاسم مطلوب' })
        .min(2, { message: 'الاسم يجب أن يحتوي على حرفين على الأقل' }),


    email: z.string().email(),

    identity: z
        .string({ required_error: 'رقم الهوية مطلوب' })
        .regex(/^\d{9}$/, { message: 'رقم الهوية يجب أن يكون 9 أرقام' }),

    gender: z.nativeEnum(GENDER, { required_error: 'الجنس مطلوب' }),

    nationality: z
        .string({ required_error: 'الجنسية مطلوبة' })
        .min(2, { message: 'الجنسية يجب أن تحتوي على 2 أحرف على الأقل' }),


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

    social_status: z.nativeEnum(SOCIAL_STATUS, {
        required_error: 'الحالة الاجتماعية مطلوبة',
    }),

    rank: z.nativeEnum(USER_RANK, { required_error: 'الدور مطلوب' }),


    additional_notes: z
        .string()
        .optional()
        .nullable(),
});

export type SecurityProfileSchemaType = z.infer<typeof SecurityProfileSchema>;
