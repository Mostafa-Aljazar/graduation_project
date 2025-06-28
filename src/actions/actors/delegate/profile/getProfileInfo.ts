"use server";

import { DelegateProfileResponse } from "@/@types/actors/delegate/profile/profileResponse.type";
import { fakeDelegateProfileResponse } from "@/content/actor/delegate/fake-delegates-profile";
import { GENDER, MATERIAL_STATUS } from "@/content/actor/delegate/profile-form";
import { AqsaAPI } from "@/services";



export interface getDelegateProfileProps {
    delegate_ID: number;
};

// export const getDelegateProfile = async (): Promise<DelegateProfileResponse> => {
export const getDelegateProfile = async ({ delegate_ID }: getDelegateProfileProps): Promise<DelegateProfileResponse> => {

    const fakeData: DelegateProfileResponse = fakeDelegateProfileResponse({ delegate_ID: delegate_ID })

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
        const response = await AqsaAPI.get(`/delegates/${delegate_ID}/profile`);

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
            user: {
                id: 0,
                name: "",
                idNumber: 0,
                gender: "" as GENDER,
                maritalStatus: "" as MATERIAL_STATUS,
                nationality: "",
                email: "",
                age: 0,
                education: "",
                mobileNumber: "",
                numberOfResponsibleCamps: 0,
                numberOfFamilies: 0,
                avatar: null,
            },
            error: errorMessage,
        };
    }
};