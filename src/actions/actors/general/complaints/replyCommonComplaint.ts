"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { USER_RANK, UserRank } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface replyCommonComplaintProps {
    complaint_Id: number;
    actor_Id: number;
    role: Exclude<UserRank, typeof USER_RANK.SECURITY | typeof USER_RANK.DISPLACED>;
    reply: string;
}

export const replyCommonComplaint = async ({
    complaint_Id,
    actor_Id,
    role,
    reply,
}: replyCommonComplaintProps): Promise<commonActionResponse> => {

    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم ارسال الرد بنجاح`,

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
        const response = await AqsaAPI.post<commonActionResponse>(`/complaints/${complaint_Id}/reply`, {
            actor_Id,
            role,
            reply,
        });

        return {
            status: 200,
            message: `تم ارسال الرد بنجاح`,
        };

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال الرد";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};