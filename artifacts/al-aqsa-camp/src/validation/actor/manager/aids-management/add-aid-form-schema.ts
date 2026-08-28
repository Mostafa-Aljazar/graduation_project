import { z } from 'zod';
import {
    DISTRIBUTION_MECHANISM,
    DISTRIBUTION_METHOD,
    QUANTITY_AVAILABILITY,
    DELEGATE_PORTIONS,
    TYPE_AIDS,
} from '@/@types/actors/common-types/index.type';

//////////////////////////////////////////////////////
// CATEGORY SCHEMA (aligned with CategoryRangeType)
//////////////////////////////////////////////////////

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
    is_default: z.boolean().optional(),
});

//////////////////////////////////////////////////////
// BASE AID FORM SCHEMA (shared between delegate/direct)
//////////////////////////////////////////////////////

const baseAidFormSchema = z.object({
    aid_name: z.string().min(1, { message: 'عنوان المساعدة مطلوب' }),
    aid_type: z.nativeEnum(TYPE_AIDS, { required_error: 'نوع المساعدة مطلوب' }),
    aid_content: z.string().min(1, { message: 'محتوي المساعدة مطلوب' }),
    delivery_date: z.date({ required_error: 'موعد التسليم مطلوب' }).nullable(),
    delivery_location: z.string().min(1, { message: 'مكان التسليم مطلوب' }),
    security_required: z.boolean({ required_error: 'يلزم تأمين مطلوب' }),
    quantity_availability: z.nativeEnum(QUANTITY_AVAILABILITY, {
        required_error: 'مقدار الكمية الموجودة مطلوب',
    }),
    existing_quantity: z.number().min(1, { message: 'الكمية الموجودة مطلوبة' }),
    displaced_single_portion: z
        .number()
        .min(1, { message: 'الحصة الواحدة يجب أن تكون 1 على الأقل' })
        .optional(),
    selected_categories: z
        .array(categoryRangeSchema)
        .min(1, { message: 'يجب اختيار فئة واحدة على الأقل' }),
    distribution_method: z.nativeEnum(DISTRIBUTION_METHOD, {
        required_error: 'طريقة التوزيع مطلوبة',
    }),
    additional_notes: z.string().optional(),
});

//////////////////////////////////////////////////////
// CONDITIONAL PARTS BASED ON distribution_mechanism
//////////////////////////////////////////////////////

// Delegate mechanism
const delegateAidSchema = z.object({
    distribution_mechanism: z.literal(DISTRIBUTION_MECHANISM.DELEGATES_LISTS),
    delegates_portions: z.nativeEnum(DELEGATE_PORTIONS, {
        required_error: 'طريقة توزيع الحصص على المندوبين مطلوبة',
    }),
    delegate_single_portion: z
        .number()
        .min(0, { message: 'عدد الأسماء لكل مندوب يجب أن يكون أكبر من 0' })
        .optional(),
});

// Direct to displaced mechanism
const directAidSchema = z.object({
    distribution_mechanism: z.literal(DISTRIBUTION_MECHANISM.DISPLACED_FAMILIES),
});

//////////////////////////////////////////////////////
// FINAL FORM SCHEMA (discriminated union)
//////////////////////////////////////////////////////

export const addAidFormSchema = z.discriminatedUnion('distribution_mechanism', [
    baseAidFormSchema.merge(delegateAidSchema),
    baseAidFormSchema.merge(directAidSchema),
]);

//////////////////////////////////////////////////////
// TYPE INFERENCE
//////////////////////////////////////////////////////

export type AddAidFormValuesType = z.infer<typeof addAidFormSchema>;
