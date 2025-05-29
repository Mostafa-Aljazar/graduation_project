"use server";
import forgetPasswordResponse from "@/@types/auth/forgetPasswordResponse.type";
import { AqsaGuestAPI } from "@/services";


export type forgetPasswordProps = {
    email: string
}

export const forgetPassword = async ({ email }: forgetPasswordProps): Promise<forgetPasswordResponse> => {
    //FIXME: remove this => just as an example
    const FakeData: forgetPasswordResponse = {
        status: "200", // 500 | 200
        message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني"
    }
    return await new Promise((resolve) => {
        // Return fake data after 3 seconds => Simulate API delay
        setTimeout(() => {
            resolve(FakeData);
        }, 3000);
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
                status: "200",
                message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني"
            };
        }

        return {
            status: "500",
            message: "حدث خطأ في إرسال رمز التحقق",
            error: "حدث خطأ في إرسال رمز التحقق"
        };

    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: error.response?.data?.error || "حدث خطأ في إرسال رمز التحقق",
            error: error.response?.data?.error || "حدث خطأ في إرسال رمز التحقق"
        };
    }
}




