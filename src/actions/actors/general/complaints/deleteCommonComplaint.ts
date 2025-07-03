"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteCommonComplaintProps {
    complaint_Id: number;
    actor_Id: number;
    role: 'DELEGATE' | 'SECURITY';
}

export const deleteCommonComplaint = async ({
    complaint_Id,
    actor_Id,
    role,
}: deleteCommonComplaintProps): Promise<modalActionResponse> => {


    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم حذف الشكوى بنجاح`,

    }
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.delete("/complaints", {
            params: {
                complaint_Id,
                actor_Id,
                role,
            },
        });

        return {
            status: "200",
            message: `تم حذف الشكوى بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف الشكوى";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};