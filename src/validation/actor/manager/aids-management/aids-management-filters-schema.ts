import { TYPE_AIDS } from "@/@types/actors/common-types/index.type";
import { z } from "zod";

export const aidsManagementFilterFormSchema = z.object({
    type: z.nativeEnum(TYPE_AIDS).nullable(),
    date_range: z
        .tuple([z.string().nullable(), z.string().nullable()])
        .default([null, null])
        .refine(
            ([start, end]) => {
                if (start && end) {
                    return new Date(end) >= new Date(start);
                }
                return true; // If either is null, no validation needed
            },
            {
                message: 'يجب أن يكون تاريخ الانتهاء أكبر من أو يساوي تاريخ البداية',
                path: ['date_range'], // Apply error to the date_range field
            }
        ),
    recipients_range: z
        .tuple([z.number().nullable(), z.number().nullable()])
        .default([null, null])
        .refine(
            ([from, to]) => {
                if (from !== null && to !== null) {
                    return to >= from;
                }
                return true;
            },
            {
                message: 'يجب أن يكون الحد الأقصى أكبر من أو يساوي الحد الأدنى',
                path: ['recipients_range.1'],
            }
        ),
});

export type aidsManagementFilterFormType = z.infer<typeof aidsManagementFilterFormSchema>;