"use server";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";



export type createNewPasswordProps = {
    email: string
    password: string;
    confirm_password: string;
}

export const createNewPassword = async ({ email, password, confirm_password }: createNewPasswordProps): Promise<commonActionResponse> => {

    const fakeData: commonActionResponse = {
        status: 200,
        message: "تم تحديث كلمة المرور بنجاح"
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

        const response = await AqsaAPI.post("/auth/create-new-password", {
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

        throw new Error("فشل في تحديث كلمة المرور");

    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            message: error.response?.data?.error || "فشل في تحديث كلمة المرور",
            error: error.response?.data?.error || "فشل في تحديث كلمة المرور"
        };
    }
}
