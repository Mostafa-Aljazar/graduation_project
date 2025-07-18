import { ACCOMMODATION_TYPE, AGES, FAMILY_STATUS_TYPE, CHRONIC_DISEASE, WIFE_STATUS } from '@/@types/actors/common-types/index.type';
import { z } from 'zod';



// Main Form Schema
export const displacedsFilterSchema = z.object({
    wife_status: z.nativeEnum(WIFE_STATUS).nullable(),
    family_number: z.number().nullable(),
    ages: z.array(z.nativeEnum(AGES)).nullable(),
    chronic_disease: z.nativeEnum(CHRONIC_DISEASE).nullable(),
    accommodation_type: z.nativeEnum(ACCOMMODATION_TYPE).nullable(),
    family_status_type: z.nativeEnum(FAMILY_STATUS_TYPE).nullable(),
    delegate: z.array(z.string()).nullable(),
});

export type displacedsFilterValues = z.infer<typeof displacedsFilterSchema>;

