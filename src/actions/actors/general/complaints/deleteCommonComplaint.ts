"use server";

import { modalActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { UserRank, UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface deleteCommonComplaintProps {
    complaint_Id: number;
    actor_Id: number;
    role: UserType | UserRank;
}

export const deleteCommonComplaint = async ({
    complaint_Id,
    actor_Id,
    role,
}: deleteCommonComplaintProps): Promise<modalActionResponse> => {

    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم حذف الشكوى بنجاح`,

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

        const response = await AqsaAPI.delete<modalActionResponse>(`/complaints/${complaint_Id}`, {
            params: {
                actor_Id,
                role
            }
        });

        return {
            status: 200,
            message: `تم حذف الشكوى بنجاح`,
        };

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف الشكوى";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};