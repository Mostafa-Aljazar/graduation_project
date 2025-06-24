import { z } from 'zod';



// Main Form Schema
export const delegatesFilterSchema = z.object({
    displaceds_number: z.array(z.number()).nullable(),
    tents_number: z.array(z.number()).nullable(),
});

export type delegatesFilterValues = z.infer<typeof delegatesFilterSchema>;

