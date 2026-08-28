"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendMeetingDelegateRequestProps {
    delegate_Ids: Number[];
    dateTime: Date;
    details: string;
}

export const sendMeetingDelegateRequest = async ({
    delegate_Ids,
    dateTime,
    details,
}: sendMeetingDelegateRequestProps): Promise<commonActionResponse> => {
    const fakeResponse: commonActionResponse = {
        status: 200,
        message: `تم ارسال طلب الاجتماع لـ ${delegate_Ids.length} مندوب بنجاح`,

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    try {

        const response = await AqsaAPI.post<commonActionResponse>("/delegates/meeting", {
            delegate_Ids,
            dateTime,
            details,
        });

        return {
            status: 200,
            message: `تم ارسال طلب الاجتماع لـ ${delegate_Ids.length} مندوب بنجاح`,
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