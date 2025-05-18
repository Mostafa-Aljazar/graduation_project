"use server";

import AqsaAPI from "@/services";

export interface sendCallRequestProps {
    displacedIds: (string | Number)[];
    dateTime: Date;
    details: string;
}

export const sendCallRequest = async ({
    displacedIds,
    dateTime,
    details,
}: sendCallRequestProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم إنشاء استدعاء لـ ${displacedIds.length} نازح بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/displaceds/calls", {
            displacedIds,
            dateTime,
            details,
        });

        return {
            status: "200",
            message: `تم إنشاء استدعاء لـ ${displacedIds.length} نازح بنجاح`,
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