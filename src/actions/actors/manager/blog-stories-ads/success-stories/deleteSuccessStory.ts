"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteSuccessStoryProps {
    successStoryId: number;
}

export const deleteSuccessStory = async ({
    successStoryId,
}: deleteSuccessStoryProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم حذف   قصة النجاح بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation
    try {
        const response = await AqsaAPI.delete("/success-stories/delete", {
            data: { successStoryId },
        });

        return {
            status: "200",
            message: `تم حذف   قصة النجاح بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "حدث خطأ أثناء حذف قصة النجاح";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};