"use server";
import { SecurityProfile, SecurityProfileResponse } from "@/@types/actors/security/profile/securityProfileResponse.type";
import { fakeSecurityProfileResponse } from "@/content/actor/security/fake-security-profile";
import { AqsaAPI } from "@/services";



export interface getSecurityProfileProps {
    security_Id: number;
};

export const getSecurityProfile = async ({ security_Id }: getSecurityProfileProps): Promise<SecurityProfileResponse> => {

    const fakeData: SecurityProfileResponse = fakeSecurityProfileResponse({ security_Id: security_Id })

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.get(`/securities/${security_Id}/profile`);

        if (response.data?.user) {
            return {
                status: 200,
                message: "تم تحميل بيانات الملف الشخصي بنجاح",
                user: response.data.user,
            };
        }
        throw new Error("فشل في تحميل بيانات الملف الشخصي");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء تحميل الملف الشخصي";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as SecurityProfile,
            error: errorMessage,
        };
    }
};