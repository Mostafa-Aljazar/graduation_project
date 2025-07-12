"use server";
import { generalAuthResponse } from "@/@types/auth/generalAuthResponse.type";
import { AqsaGuestAPI } from "@/services";



export type createNewPasswordProps = {
    email: string
    password: string;
    confirm_password: string;
}

export const createNewPassword = async ({ email, password, confirm_password }: createNewPasswordProps): Promise<generalAuthResponse> => {
    //FIXME: remove this => just as an example
    const FakeData: generalAuthResponse = {
        status: 200,
        message: "تم تحديث كلمة المرور بنجاح"
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

        const response = await AqsaGuestAPI.post("/auth/create-password", {
            password,
            confirm_password,
            email
        });

        if (response.data) {
            return {
                status: 200,
                message: "تم تحديث كلمة المرور بنجاح"
            };
        }

        return {
            status: 500,
            message: "فشل في تحديث كلمة المرور",
            error: "فشل في تحديث كلمة المرور"
        };

    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: error.response?.data?.error || "فشل في تحديث كلمة المرور",
            error: error.response?.data?.error || "فشل في تحديث كلمة المرور"
        };
    }
}
