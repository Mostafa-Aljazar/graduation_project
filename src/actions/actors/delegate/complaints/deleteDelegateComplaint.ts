"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface DeleteDelegateComplaintProps {
    complaint_ID: number;
    delegate_ID: number;
}

export const delegateDeleteComplaint = async ({
    complaint_ID,
    delegate_ID
}: DeleteDelegateComplaintProps): Promise<modalActionResponse> => {


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
        const response = await AqsaAPI.delete("/delegate/complaint", {
            params: {
                complaint_ID, delegate_ID
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