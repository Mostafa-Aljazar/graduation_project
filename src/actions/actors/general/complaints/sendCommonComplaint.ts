"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { AqsaAPI } from "@/services";


export interface sendCommonComplaintProps {
    actor_Id: number;
    role: "DELEGATE" | "SECURITY" | "SECURITY_OFFICER" | "DISPLACED"
    reception: "MANAGER" | "DELEGATE" | "SECURITY_OFFICER";
    title: string;
    content: string;
}

export const sendCommonComplaint = async ({
    actor_Id,
    role,
    reception,
    title,
    content
}: sendCommonComplaintProps): Promise<modalActionResponse> => {



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
        const response = await AqsaAPI.post("/complaint/send-complaints", {
            actor_Id,
            role,
            reception,
            title,
            content
        });

        return {
            status: "200",
            message: `تم ارسال الشكوي بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء ارسال الشكوي";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};