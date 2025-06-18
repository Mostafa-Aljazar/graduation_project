import { z } from 'zod';
import {
    DISTRIBUTION_MECHANISM,
    DISTRIBUTION_METHOD,
    QUANTITY_AVAILABILITY,
    DELEGATE_PORTIONS,
} from '@/content/actor/manager/aids-management';

// Category Schema
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

// Main Form Schema
export const addAidFormSchema = z.object({
    aidName: z.string().min(1, { message: 'نوع المساعدة مطلوب' }),
    aidType: z.string().min(1, { message: 'نوع المساعدة مطلوب' }),
    aidContent: z.string().min(1, { message: 'محتوي المساعدة مطلوب' }),
    deliveryDate: z.date({ required_error: 'موعد التسليم مطلوب' }).nullable(),
    deliveryLocation: z.string().min(1, { message: 'مكان التسليم مطلوب' }),
    securityRequired: z.boolean({ required_error: 'يلزم تأمين مطلوب' }),
    quantityAvailability: z.nativeEnum(QUANTITY_AVAILABILITY, {
        required_error: 'مقدار الكمية الموجودة مطلوب',
    }),
    existingQuantity: z.number().min(1, { message: 'الكمية الموجودة مطلوبة' }),
    singlePortion: z.number().min(1, { message: 'الحصة الواحدة يجب أن تكون 1 على الأقل' }),
    distributionMethod: z.nativeEnum(DISTRIBUTION_METHOD, {
        required_error: 'طريقة التوزيع مطلوبة',
    }),
    selectedCategories: z
        .array(categoryRangeSchema)
        .min(1, { message: 'يجب اختيار فئة واحدة على الأقل' }),
    distributionMechanism: z.nativeEnum(DISTRIBUTION_MECHANISM, {
        required_error: 'آلية التوزيع مطلوبة',
    }),
    delegatesPortions: z.nativeEnum(DELEGATE_PORTIONS, {
        required_error: 'طريقة توزيع الحصص على المندوبين مطلوبة',
    }),
    delegateSinglePortion: z.number().min(0, 'عدد الأسماء لكل مندوب يجب أن يكون أكبر من 0'),
    aidAccessories: z.string(),
    // receivedDisplaced: z.array(z.union([z.string(), z.number()])),


});

export type addAidFormValues = z.infer<typeof addAidFormSchema>;


