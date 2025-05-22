"use server";

import AqsaAPI from "@/services";

export interface changeStatusComplaint {
    complaint_Id: string | Number;
}

export const changeStatusComplaint = async ({
    complaint_Id,
}: changeStatusComplaint): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تغيير حالة الشكوى بنجاح`,

    }
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });


    // Real implementation with filters

    try {
        const response = await AqsaAPI.delete("/manager/complaint/changeStatus", {
            params: {
                complaint_Id,
            },
        });

        return {
            status: "200",
            message: `تم تغيير حالة الشكوى بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تغيير حالة الشكوى";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};