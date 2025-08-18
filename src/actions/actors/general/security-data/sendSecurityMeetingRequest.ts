"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendSecurityMeetingRequestProps {
    security_Ids: number[];
    dateTime: Date;
    details: string;
}

export const sendSecurityMeetingRequest = async ({
    security_Ids,
    dateTime,
    details,
}: sendSecurityMeetingRequestProps): Promise<commonActionResponse> => {
    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم ارسال طلب الاجتماع لـ ${security_Ids.length} عنصر أمني بنجاح`,
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

        const response = await AqsaAPI.post<commonActionResponse>("/securities/meeting", {
            security_Ids,
            dateTime,
            details,
        });

        return {
            status: 200,
            message: `تم ارسال طلب الاجتماع لـ ${security_Ids.length} عنصر أمني بنجاح`,
        };
    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال طلب الاجتماع";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
