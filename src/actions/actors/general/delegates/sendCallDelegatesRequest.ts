"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendCallDelegatesRequestProps {
    delegate_Ids: Number[];
    dateTime: Date;
    details: string;
}

export const sendCallDelegatesRequest = async ({
    delegate_Ids,
    dateTime,
    details,
}: sendCallDelegatesRequestProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم إنشاء استدعاء لـ ${delegate_Ids.length} مندوب بنجاح`,

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
        const response = await AqsaAPI.post<commonActionResponse>("/delegates/calls", {
            delegate_Ids,
            dateTime,
            details,
        });

        return {
            status: 200,
            message: `تم إنشاء استدعاء لـ ${delegate_Ids.length} مندوب بنجاح`,
        };
    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إنشاء الاستدعاء";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};