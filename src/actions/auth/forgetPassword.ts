"use server";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaGuestAPI } from "@/services";

export interface forgetPasswordProps {
    email: string
}

export const forgetPassword = async ({ email }: forgetPasswordProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني"
    }

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    //FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaGuestAPI.post("/auth/forget-password", {
            email
        });

        if (response.data) {
            return {
                status: 200,
                message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني"
            };
        }

        throw new Error("حدث خطأ في إرسال رمز التحقق");

    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.error || "حدث خطأ في إرسال رمز التحقق",
            error: error.response?.data?.error || "حدث خطأ في إرسال رمز التحقق"
        };
    }
}




