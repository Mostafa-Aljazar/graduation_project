"use server";

import AqsaAPI from "@/services";

export interface sendUpdateRequestProps {
    displacedIds: (string | Number)[];

}

export const sendUpdateRequest = async ({
    displacedIds,

}: sendUpdateRequestProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم ارسال طلب تحديث لـ ${displacedIds.length} نازح بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/displaceds/update", {
            displacedIds,

        });

        return {
            status: "200",
            message: `تم ارسال طلب تحديث لـ ${displacedIds.length} نازح بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال طلب تحديث البيانات";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};