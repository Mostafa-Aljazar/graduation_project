"use server";

import AqsaAPI from "@/services";

export interface replyComplaintProps {
    reply: string;
    complaint_Id: string | number;
}

export const replyComplaint = async ({
    reply,
    complaint_Id
}: replyComplaintProps): Promise<modalActionResponse> => {



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