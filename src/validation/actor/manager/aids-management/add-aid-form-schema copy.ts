import { z } from 'zod';
import {
    DISTRIBUTION_MECHANISM, DISTRIBUTION_METHOD,
    QUANTITY_AVAILABILITY,
    DELEGATE_PORTIONS,
    TYPE_AIDS,
} from '@/@types/actors/common-types/index.type';

// Category Schema
export const categoryRangeSchema = z.object({
    id: z.string({ message: 'معرف الفئة مطلوب' }),
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
    aid_name: z.string().min(1, { message: 'عنوان المساعدة مطلوب' }),
    // aidType: z.string().min(1, { message: 'نوع المساعدة مطلوب' }),
    aid_type: z.nativeEnum(TYPE_AIDS, { required_error: 'نوع المساعدة مطلوب' }),
    aid_content: z.string().min(1, { message: 'محتوي المساعدة مطلوب' }),
    delivery_date: z.date({ required_error: 'موعد التسليم مطلوب' }).nullable(),
    delivery_location: z.string().min(1, { message: 'مكان التسليم مطلوب' }),
    security_required: z.boolean({ required_error: 'يلزم تأمين مطلوب' }),
    quantity_availability: z.nativeEnum(QUANTITY_AVAILABILITY, {
        required_error: 'مقدار الكمية الموجودة مطلوب',
    }),
    existing_quantity: z.number().min(1, { message: 'الكمية الموجودة مطلوبة' }),
    selected_categories: z
        .array(categoryRangeSchema)
        .min(1, { message: 'يجب اختيار فئة واحدة على الأقل' }),
    distribution_method: z.nativeEnum(DISTRIBUTION_METHOD, {
        required_error: 'طريقة التوزيع مطلوبة',
    }),
    additional_notes: z.string(),
    displaced_single_portion: z.number().min(1, { message: 'الحصة الواحدة يجب أن تكون 1 على الأقل' }),
    distribution_mechanism: z.nativeEnum(DISTRIBUTION_MECHANISM, {
        required_error: 'آلية التوزيع مطلوبة',
    }),
    delegates_portions: z.nativeEnum(DELEGATE_PORTIONS, {
        required_error: 'طريقة توزيع الحصص على المندوبين مطلوبة',
    }),
    delegate_single_portion: z.number().min(0, 'عدد الأسماء لكل مندوب يجب أن يكون أكبر من 0'),
});

export type addAidFormValues = z.infer<typeof addAidFormSchema>;


