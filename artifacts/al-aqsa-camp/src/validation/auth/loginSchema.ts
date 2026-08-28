import { USER_TYPE } from "@/constants/userTypes";
import { z } from "zod";

export const loginSchema = z.object({
    userType: z.nativeEnum(USER_TYPE, {
        errorMap: () => ({ message: "الرجاء اختيار نوع المستخدم صحيح" }),
    }),
    email: z
        .string({ required_error: "حقل البريد الإلكتروني مطلوب" })
        .email("صيغة البريد الإلكتروني غير صحيحة"),
    password: z
        .string({ required_error: "حقل كلمة المرور مطلوب" })
        .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),
});

export type loginType = z.infer<typeof loginSchema>;
