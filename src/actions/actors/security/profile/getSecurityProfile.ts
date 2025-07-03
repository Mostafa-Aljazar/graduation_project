"use server";

import { ISecurityData, ISecurityResponse, } from "@/@types/actors/security/profile/securityProfileResponse.type";
import { fakeSecurityResponse } from "@/content/actor/security/fake-security-profile";
import { AqsaAPI } from "@/services";



export interface getSecurityProfileProps {
    security_Id: number;
};

export const getSecurityProfile = async ({ security_Id }: getSecurityProfileProps): Promise<ISecurityResponse> => {

    const fakeData: ISecurityResponse = fakeSecurityResponse({ security_Id: security_Id })

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 1000);
    });

    // Real implementation below, if needed


    try {

        /////////////////////////////////////////////////////////////
        // FIXME: THIS IS THE REAL IMPLEMENTATION
        /////////////////////////////////////////////////////////////
        const response = await AqsaAPI.get(`/securities/${security_Id}/profile`);

        if (response.data?.user) {
            return {
                status: "200",
                message: "تم تحميل بيانات الملف الشخصي بنجاح",
                user: response.data.user,
            };
        }
        throw new Error("فشل في تحميل بيانات الملف الشخصي");
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء تحميل الملف الشخصي";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            user: {} as ISecurityData,
            error: errorMessage,
        };
    }
};