"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendSecurityCallRequestProps {
    security_Ids: number[];
    dateTime: Date;
    details: string;
}

export const sendSecurityCallRequest = async ({
    security_Ids,
    dateTime,
    details,
}: sendSecurityCallRequestProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم إنشاء استدعاء لـ ${security_Ids.length} عنصر أمني بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/securities/calls", {
            security_Ids,
            dateTime,
            details,
        });

        return {
            status: 200,
            message: `تم إنشاء استدعاء لـ ${security_Ids.length} عنصر أمني بنجاح`,
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