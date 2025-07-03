"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface replyCommonComplaintProps {
    complaint_Id: number;
    actor_Id: number;
    role: 'DELEGATE' | 'SECURITY';
    reply: string;

}

export const replyCommonComplaint = async ({
    complaint_Id,
    actor_Id,
    role,
    reply,
}: replyCommonComplaintProps): Promise<modalActionResponse> => {



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
        const response = await AqsaAPI.post("/complaints/reply", {
            complaint_Id,
            actor_Id,
            role,
            reply,
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