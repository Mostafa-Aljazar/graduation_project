"use server";

import AqsaAPI from "@/services";

export interface deleteDelegatesProps {
    delegatesIds: (string | Number)[];
}

export const deleteDelegates = async ({
    delegatesIds,
}: deleteDelegatesProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم حذف ${delegatesIds.length} مندوب بنجاح`,

    }
    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/delegates/delete", {
            delegatesIds,
        });

        return {
            status: "200",
            message: `تم حذف ${delegatesIds.length} مندوب بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف المناديب";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};