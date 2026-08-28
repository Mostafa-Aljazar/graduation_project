"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { USER_RANK, UserRank } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface sendCommonComplaintProps {
    actor_Id: number;
    role: Exclude<
        (typeof USER_RANK)[UserRank],
        typeof USER_RANK.MANAGER
    >;
    reception: Exclude<
        (typeof USER_RANK)[UserRank],
        typeof USER_RANK.DISPLACED | typeof USER_RANK.SECURITY
    >;
    title: string;
    content: string;
}

export const sendCommonComplaint = async ({
    actor_Id,
    role,
    reception,
    title,
    content
}: sendCommonComplaintProps): Promise<commonActionResponse> => {

    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم ارسال الشكوي بنجاح`,
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
        const response = await AqsaAPI.post<commonActionResponse>("/complaints/send-complaint", {
            actor_Id,
            role,
            reception,
            title,
            content
        });

        if (response.data) {
            return response.data
        }

        throw new Error("حدث خطأ أثناء ارسال الشكوى");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال الشكوي";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};