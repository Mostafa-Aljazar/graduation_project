"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface sendDisplacedComplaintProps {
    displaced_ID: number;
    receiver: "DELEGATE" | "MANAGER" | "SECURITY_OFFICER";
    title: string;
    description: string;
}

export const sendDisplacedComplaint = async ({
    displaced_ID,
    receiver,
    title,
    description,
}: sendDisplacedComplaintProps): Promise<modalActionResponse> => {

    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم ارسال شكوى النازح بنجاح`,
    }

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real implementation with filters

    try {
        const response = await AqsaAPI.post("/displaceds/send-complaints", {
            displaced_ID,
            receiver,
            title,
            description,
        });

        return {
            status: "200",
            message: `تم ارسال شكوى النازح بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال شكوى النازح";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};