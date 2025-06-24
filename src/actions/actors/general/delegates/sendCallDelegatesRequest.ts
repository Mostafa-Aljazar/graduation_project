"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendCallDelegatesRequestProps {
    delegateIDs: Number[];
    dateTime: Date;
    details: string;
}

export const sendCallDelegatesRequest = async ({
    delegateIDs,
    dateTime,
    details,
}: sendCallDelegatesRequestProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم إنشاء استدعاء لـ ${delegateIDs.length} مندوب بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/delegates/calls", {
            delegateIDs,
            dateTime,
            details,
        });

        return {
            status: "200",
            message: `تم إنشاء استدعاء لـ ${delegateIDs.length} مندوب بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إنشاء الاستدعاء";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};