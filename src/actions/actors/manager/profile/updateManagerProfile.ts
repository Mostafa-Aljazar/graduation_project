"use server";

import { ManagerProfile, ManagerProfileResponse } from "@/@types/actors/manager/profile/managerProfileResponse.type";
import { USER_RANK, USER_TYPE } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";
import { ManagerProfileType } from "@/validation/actor/manager/profile/manager-profile-Schema";



export interface UpdateManagerProfileProps {
    manager_Id: number;
    payload: ManagerProfileType;
}


export const updateManagerProfile = async ({ manager_Id, payload }: UpdateManagerProfileProps): Promise<ManagerProfileResponse> => {
    const fakeData: ManagerProfileResponse = {
        status: 200,
        message: "تم تحديث الملف الشخصي للمدير بنجاح",
        user: {
            id: manager_Id,
            profile_image: payload.profile_image || "",
            name: payload.name,
            email: payload.email,
            identity: payload.identity,
            gender: payload.gender,
            nationality: payload.nationality,
            phone_number: payload.phone_number as string,
            alternative_phone_number: payload.alternative_phone_number || "",
            social_status: payload.social_status,
            role: USER_TYPE.MANAGER,
            rank: USER_TYPE.MANAGER,
        },
    };

    return await new Promise((resolve) => setTimeout(() => resolve(fakeData), 500));

    // Prepare API payload
    const apiPayload = {
        ...payload,
        alternative_phone_number: payload.alternative_phone_number || "",
        role: USER_RANK.MANAGER,
        rank: USER_RANK.MANAGER,
        id: manager_Id,
    };

    try {
        const response = await AqsaAPI.put<ManagerProfileResponse>(`/manager/${manager_Id}/profile`, apiPayload);

        if (response.data?.user) {
            return response.data
        }

        throw new Error("فشل في تحديث بيانات الملف الشخصي");

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تحديث الملف الشخصي";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            user: {} as ManagerProfile,
            error: errorMessage,
        };

    }
};