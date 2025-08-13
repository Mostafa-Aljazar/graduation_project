"use server";

import { modalActionResponse } from "@/@types/common/modal/commonActionResponse.type";
import { USER_RANK, USER_TYPE, UserRank, UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface changeStatusCommonComplaintProps {
    complaint_Id: number;
    actor_Id: number;
    role: Exclude<UserRank, typeof USER_RANK.SECURITY | typeof USER_RANK.DISPLACED>;

}

export const changeStatusCommonComplaint = async ({
    complaint_Id, actor_Id, role
}: changeStatusCommonComplaintProps): Promise<modalActionResponse> => {

    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم تغيير حالة الشكوى بنجاح`,
    }

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });


    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.put<modalActionResponse>(`/complaints/${complaint_Id}/changeStatus`, {
            actor_Id, role
        });

        return {
            status: 200,
            message: `تم تغيير حالة الشكوى بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تغيير حالة الشكوى";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};