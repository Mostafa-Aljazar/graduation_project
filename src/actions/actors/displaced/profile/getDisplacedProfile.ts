"use server";

import { DisplacedProfile, DisplacedProfileResponse } from "@/@types/actors/displaced/profile/displacedProfileResponse.type";
import { fakeDisplacedProfileResponse } from "@/content/actor/displaced/fake-data/fake-displaced-profile";
import { AqsaAPI } from "@/services";

export interface getDisplacedProfileProps {
    displaced_Id: number;
};

export const getDisplacedProfile = async ({ displaced_Id }: getDisplacedProfileProps): Promise<DisplacedProfileResponse> => {

    const fakeData: DisplacedProfileResponse = fakeDisplacedProfileResponse({ displaced_Id: displaced_Id })

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
        const response = await AqsaAPI.get(`/displaceds/${displaced_Id}/profile`);

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
            user: {} as DisplacedProfile,
            error: errorMessage,
        };
    }
};