import { ACCOMMODATION_TYPE, AGES, CASE_TYPE, CHRONIC_DISEASE, WIFE_STATUS } from '@/content/actor/displaced/filter';
import { z } from 'zod';



// Main Form Schema
export const displacedFilterSchema = z.object({
    wife_status: z.nativeEnum(WIFE_STATUS).nullable(),
    family_number: z.number().nullable(),
    ages: z.array(z.nativeEnum(AGES)).nullable(),
    chronic_disease: z.nativeEnum(CHRONIC_DISEASE).nullable(),
    accommodation_type: z.nativeEnum(ACCOMMODATION_TYPE).nullable(),
    case_type: z.nativeEnum(CASE_TYPE).nullable(),
    delegate: z.array(z.string()).nullable(),
});

export type displacedFilterValues = z.infer<typeof displacedFilterSchema>;

