"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteAdProps {
    adId: (string | number)
}

export const deleteAd = async ({
    adId,
}: deleteAdProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم حذف  الإعلان بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation
    try {
        const response = await AqsaAPI.delete("/ads/delete", {
            data: { adId },
        });

        return {
            status: "200",
            message: `تم حذف  الإعلان بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "حدث خطأ أثناء حذف الإعلان";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};