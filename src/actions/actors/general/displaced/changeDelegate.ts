"use server";

import AqsaAPI from "@/services";

export interface changeDelegateProps {
    displacedIds: (string | Number)[];
    delegateId: string | Number;
}

export const changeDelegate = async ({
    displacedIds,
    delegateId,
}: changeDelegateProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تغيبر المندوب لـ ${displacedIds.length} نازح بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/displaceds/changeDelegate", {
            displacedIds,
            delegateId,
        });

        return {
            status: "200",
            message: `تم تغيبر المندوب لـ ${displacedIds.length} نازح بنجاح`,
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