"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
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
}: sendSecurityMeetingRequestProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم إرسال طلب الاجتماع لـ ${security_Ids.length} عنصر أمني بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation
    try {
        const response = await AqsaAPI.post("/securities/meeting", {
            security_Ids,
            dateTime,
            details,
        });

        return {
            status: response.status,
            message: `تم إرسال طلب الاجتماع لـ ${security_Ids.length} عنصر أمني بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "حدث خطأ أثناء إرسال طلب الاجتماع";
        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
