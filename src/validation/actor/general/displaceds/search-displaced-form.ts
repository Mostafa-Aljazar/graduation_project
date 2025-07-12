import { z } from 'zod';

export const searchSchema = z.object({
    search: z.string().min(1, 'يرجى إدخال كلمة للبحث'),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
