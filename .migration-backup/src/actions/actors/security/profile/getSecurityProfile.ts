"use server";
import { SecurityProfile, SecurityProfileResponse } from "@/@types/actors/security/profile/securityProfileResponse.type";
import { fakeSecurityProfileResponse } from "@/content/actor/security/fake-data/fake-security-profile";
import { AqsaAPI } from "@/services";

export interface getSecurityProfileProps {
    security_Id: number;
};

export const getSecurityProfile = async ({ security_Id }: getSecurityProfileProps): Promise<SecurityProfileResponse> => {

    const fakeResponse: SecurityProfileResponse = fakeSecurityProfileResponse({ security_Id: security_Id })

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.get<SecurityProfileResponse>(`/securities/${security_Id}/profile`);

        if (response.data?.user) {
            return response.data
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