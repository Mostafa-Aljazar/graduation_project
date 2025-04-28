"use server";
import verifyOtpResponse from "@/@types/auth/verifyOtpResponse.type";
import AqsaAPI from "@/services";

export const verifyOtp = async (formData: FormData): Promise<verifyOtpResponse> => {
    //FIXME: remove this => just as an example
    const FakeData: verifyOtpResponse = {
        status: "200", // 500 | 200
        message: `تم التحقق من الرمز بنجاح ${formData.get("otp")} | ${formData.get("email")}`,
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
        const otp = formData.get("otp");
        const email = formData.get("email");

        if (!otp || !email) {
            return {
                status: "400",
                message: "جميع الحقول مطلوبة",
                error: "جميع الحقول مطلوبة"
            };
        }

        const response = await AqsaAPI.post("/auth/verify-otp", {
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



