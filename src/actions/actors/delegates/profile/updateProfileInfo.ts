"use server";

import { DelegateProfile, DelegateProfileResponse } from "@/@types/actors/delegate/profile/delegateProfileResponse.type";
import { AqsaAPI } from "@/services";
import { DelegateProfileSchemaType } from "@/validation/actor/delegate/delegate-profile-schema"; // Import the new payload type

export interface UpdateDelegateProfileProps {
    delegate_Id: number;
    payload: DelegateProfileSchemaType;
}

export const updateDelegateProfile = async ({ delegate_Id, payload }: UpdateDelegateProfileProps): Promise<DelegateProfileResponse> => {

    const fakeData: DelegateProfileResponse = {
        status: 200,
        message: "تم تحديث الملف الشخصي بنجاح",
        user: {
            ...payload,
            id: delegate_Id,//FIXME:
            phone_number: payload.phone_number as string,
            alternative_phone_number: payload.alternative_phone_number as string,
            profile_image: payload.profile_image as string,
        },
    };
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.put<DelegateProfileResponse>(`/delegates/${delegate_Id}/profile`, payload);

        if (response.data?.user) {
            return response.data
        }

        throw new Error("فشل في تحديث الملف الشخصي");

    } catch (error: any) {
        const errorMessage = error.response?.data?.error || error.message || "bbbbحدث خطأ أثناء تحديث الملف الشخصي";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as DelegateProfile,
            error: errorMessage,
        };
    }
};