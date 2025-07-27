"use server";

import { ManagerProfile, ManagerProfileResponse } from "@/@types/actors/manager/profile/managerProfileResponse.type";
import { fakeManagerProfileResponse } from "@/content/actor/manager/fake-manager-profile";
import { AqsaAPI } from "@/services";



export interface getManagerProfileProps {
    manager_Id: number;
};


export const getManagerProfile = async ({ manager_Id }: getManagerProfileProps): Promise<ManagerProfileResponse> => {

    const fakeData: ManagerProfileResponse = fakeManagerProfileResponse({ manager_Id })

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<ManagerProfileResponse>(`/manager/${manager_Id}/profile`);

        if (response.data?.user) {
            return response.data
        }

        throw new Error("فشل في تحميل بيانات الملف الشخصي");

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "حدث خطأ أثناء تحميل الملف الشخصي";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as ManagerProfile,
            error: errorMessage,
        };
    }
};