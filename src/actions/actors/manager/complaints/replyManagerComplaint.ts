"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";

export interface replyManagerComplaintProps {
    reply: string;
    complaint_Id: number;
}

export const replyManagerComplaint = async ({
    reply,
    complaint_Id
}: replyManagerComplaintProps): Promise<modalActionResponse> => {



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
        const response = await AqsaAPI.post("/manager/complaint/reply", {
            complaint_Id,
            reply
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