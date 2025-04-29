"use server";
import createNewPasswordResponse from "@/@types/auth/createNewPasswordResponse";
import AqsaAPI from "@/services";

export const createNewPassword = async (formData: FormData): Promise<createNewPasswordResponse> => {
    //FIXME: remove this => just as an example
    const FakeData: createNewPasswordResponse = {
        status: "200",
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
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");
        const email = formData.get("email");

        if (!password || !confirm_password || !email) {
            return {
                status: "400",
                message: "جميع الحقول مطلوبة",
                error: "جميع الحقول مطلوبة"
            };
        }

        if (password !== confirm_password) {
            return {
                status: "400",
                message: "كلمات المرور غير متطابقة",
                error: "كلمات المرور غير متطابقة"
            };
        }

        const response = await AqsaAPI.post("/auth/create-password", {
            password,
            email
        });

        if (response.data) {
            return {
                status: "200",
                message: "تم تحديث كلمة المرور بنجاح"
            };
        }

        return {
            status: "500",
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
