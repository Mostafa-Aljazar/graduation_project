"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendMeetingRequestProps {
    displaced_Ids: number[];
    dateTime: Date;
    details: string;
}

export const sendMeetingRequest = async ({
    displaced_Ids,
    dateTime,
    details,
}: sendMeetingRequestProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم ارسال طلب الاجتماع لـ ${displaced_Ids.length} نازح بنجاح`,

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
        const response = await AqsaAPI.post<commonActionResponse>("/displaceds/meeting", {
            displaced_Ids,
            dateTime,
            details,
        });

        return {
            status: 200,
            message: `تم ارسال طلب الاجتماع لـ ${displaced_Ids.length} نازح بنجاح`,
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