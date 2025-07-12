"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface receiveDisplacedAidProps {
    receiveCode: string;
    aid_id: string | number;
    displaced_id: number;
    role: UserType;
    employee_id: number
}

export const receiveDisplacedAid = async ({
    receiveCode,
    aid_id,
    displaced_id,
    role,
    employee_id,
}: receiveDisplacedAidProps): Promise<modalActionResponse> => {
    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تسليم المساعدة بنجاح`,
    };

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
        const response = await AqsaAPI.post("/manager/aids/receive-aid", {
            receiveCode,
            aid_id,
            displaced_id,
            role,
            employee_id,
        });

        return {
            status: "200",
            message: `تم تسليم المساعدة بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تسليم المساعدة";

        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};
