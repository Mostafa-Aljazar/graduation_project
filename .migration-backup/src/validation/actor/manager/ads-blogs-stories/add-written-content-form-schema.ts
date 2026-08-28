import { z } from 'zod';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';

export const AddWrittenContentFormSchema = z.object({
    type: z.nativeEnum(TYPE_WRITTEN_CONTENT, {
        required_error: 'يجب اختيار نوع المحتوى',
    }),
    title: z
        .string()
        .min(1, { message: 'العنوان مطلوب' })
        .max(100, { message: 'العنوان يجب ألا يتجاوز 100 حرف' }),
    brief: z
        .string()
        .max(500, { message: 'النبذة يجب ألا تتجاوز 500 حرف' })
        .optional(),
    content: z
        .string()
        .min(5, { message: 'النص مطلوب' })
        .max(10000, { message: 'النص يجب ألا يتجاوز 10000 حرف' }),
    files: z.array(z.any()).optional(), // FileWithPath type isn't strictly typed by Zod
    image_urls: z.array(z.string()).optional(),
});

export type AddWrittenContentFormType = z.infer<typeof AddWrittenContentFormSchema>;
