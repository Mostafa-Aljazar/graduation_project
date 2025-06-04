import { z } from 'zod';

// Zod Schema for CategoryRange
export const categoryRangeSchema = z.object({
    id: z.string().min(1, { message: 'معرف الفئة مطلوب' }),
    label: z.string().min(2, { message: 'يجب أن يكون التسمية أطول من حرفين' }),
    min: z.number().min(1, { message: 'يجب أن يكون الحد الأدنى 1 على الأقل' }),
    max: z
        .number()
        .nullable()
        .refine((val) => val === null || val > 0, {
            message: 'الحد الأقصى يجب أن يكون أكبر من الصفر أو فارغ',
        }),
    portion: z.number().min(1, { message: 'الحصة يجب أن تكون 1 على الأقل' }).optional(),
    isDefault: z.boolean().optional(),
});

// Form Values Schema for AddForm
export const addAidFormSchema = z.object({
    assistanceName: z.string().min(1, { message: 'نوع المساعدة مطلوب' }),
    assistanceType: z.string().min(1, { message: 'نوع المساعدة مطلوب' }),
    assistanceContent: z.string().min(1, { message: 'محتوي المساعدة مطلوب' }),
    deliveryDate: z
        .date()
        .nullable()
        .refine((val) => val !== null, { message: 'موعد التسليم مطلوب' }),
    deliveryLocation: z.string().min(1, { message: 'مكان التسليم مطلوب' }),
    securityRequired: z.boolean({ required_error: 'يلزم تأمين مطلوب' }),
    quantityAvailability: z.enum(['limited', 'unlimited'], {
        required_error: 'مقدار الكمية الموجودة مطلوب',
    }),
    existingQuantity: z
        .number()
        .min(1, { message: 'الكمية الموجودة مطلوبة' })
    ,
    singlePortion: z.number().min(1, { message: 'الحصة الواحدة يجب أن تكون 1 على الأقل' }),
    distributionMethod: z.enum(['equal', 'by_members'], {
        required_error: 'حصة كل عائلة مطلوبة',
    }),
    selectedCategories: z
        .array(categoryRangeSchema)
        .min(1, { message: 'يجب اختيار فئة واحدة على الأقل' }),
    distributionMechanism: z.enum(["delegates_lists", "displaced_families"], {
        required_error: 'حصة كل عائلة مطلوبة',
    }),
});

export type addAidFormValues = z.infer<typeof addAidFormSchema>;