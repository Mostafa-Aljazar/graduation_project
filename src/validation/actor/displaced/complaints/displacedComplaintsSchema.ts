import { USER_TYPE } from "@/constants/userTypes";
import { COMPLAINTS_STATUS } from "@/content/actor/delegate/complaints";
import { z } from "zod";


export const displacedComplaintFilterFormSchema = z.object({
    status: z.nativeEnum(COMPLAINTS_STATUS).nullable(),
    receiver_type: z.nativeEnum(USER_TYPE).nullable(),
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


});

export type displacedComplaintFilterFormValues = z.infer<typeof displacedComplaintFilterFormSchema>;


