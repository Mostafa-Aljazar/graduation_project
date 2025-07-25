"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { USER_RANK, USER_TYPE, UserRank, UserType } from "@/constants/userTypes";
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
}: sendCommonComplaintProps): Promise<modalActionResponse> => {

    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم ارسال الشكوي بنجاح`,
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
        const response = await AqsaAPI.post<modalActionResponse>("/complaints/send-complaint", {
            actor_Id,
            role,
            reception,
            title,
            content
        });

        return {
            status: 200,
            message: `تم ارسال الشكوي بنجاح`,
        };

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