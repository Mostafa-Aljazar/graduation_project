"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
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
}: deleteCommonComplaintProps): Promise<commonActionResponse> => {

    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم حذف الشكوى بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.delete<commonActionResponse>(`/complaints/${complaint_Id}`, {
            data: {
                actor_Id,
                role
            }
        });

        if (response.data) {
            return response.data
        }

        throw new Error("حدث خطأ أثناء حذف الشكوى");

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