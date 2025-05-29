"use server";
import verifyOtpResponse from "@/@types/auth/verifyOtpResponse.type";
import { AqsaGuestAPI } from "@/services";


export type verifyOtpProps = {
    otp: string;
    email: string
}

export const verifyOtp = async ({ email, otp }: verifyOtpProps): Promise<verifyOtpResponse> => {
    //FIXME: remove this => just as an example
    const FakeData: verifyOtpResponse = {
        status: "200", // 500 | 200
        message: `تم التحقق من الرمز بنجاح ${otp} | ${email})}`,
        // error: "رمز التحقق غير صالح"
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


        const response = await AqsaGuestAPI.post("/auth/verify-otp", {
            otp,
            email
        });

        if (response.data) {
            return {
                status: "200",
                message: "تم التحقق من الرمز بنجاح"
            };
        }

        return {
            status: "500",
            message: "رمز التحقق غير صالح",
            error: "رمز التحقق غير صالح"
        };

    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: error.response?.data?.error || "رمز التحقق غير صالح",
            error: error.response?.data?.error || "رمز التحقق غير صالح"
        };
    }
}



