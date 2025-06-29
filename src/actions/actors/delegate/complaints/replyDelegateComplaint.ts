"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface replyDelegateComplaintProps {
    reply: string;
    complaint_ID: number;
    delegate_ID: number;
}

export const replyDelegateComplaint = async ({
    reply,
    complaint_ID,
    delegate_ID
}: replyDelegateComplaintProps): Promise<modalActionResponse> => {



    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم ارسال الرد بنجاح`,

    }
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////





    try {
        const response = await AqsaAPI.post("/delegate/complaint/reply", {
            reply,
            complaint_ID,
            delegate_ID
        });

        return {
            status: "200",
            message: `تم ارسال الرد بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال الرد";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};