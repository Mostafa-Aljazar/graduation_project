"use server";

import AqsaAPI from "@/services";

export interface sendMeetingDelegateRequestProps {
    delegateIds: (string | Number)[];
    dateTime: Date;
    details: string;
}

export const sendMeetingDelegateRequest = async ({
    delegateIds,
    dateTime,
    details,
}: sendMeetingDelegateRequestProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم ارسال طلب الاجتماع لـ ${delegateIds.length} مندوب بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/delegates/meeting", {
            delegateIds,
            dateTime,
            details,
        });

        return {
            status: "200",
            message: `تم ارسال طلب الاجتماع لـ ${delegateIds.length} مندوب بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال طلب الاجتماع";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};