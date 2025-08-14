"use server";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaGuestAPI } from "@/services";


export interface verifyOtpProps {
    otp: string;
    email: string
}

export const verifyOtp = async ({ email, otp }: verifyOtpProps): Promise<commonActionResponse> => {

    const fakeData: commonActionResponse = {
        status: 200,
        message: 'تم التحقق من الرمز بنجاح',
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
        const response = await AqsaGuestAPI.post("/auth/verify-otp", {
            otp,
            email
        });

        if (response.data) {
            return {
                status: 200,
                message: "تم التحقق من الرمز بنجاح"
            };
        }

        throw new Error("رمز التحقق غير صالح");

    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.error || "رمز التحقق غير صالح",
            error: error.response?.data?.error || "رمز التحقق غير صالح"
        };
    }
}



