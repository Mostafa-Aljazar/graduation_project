"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface receiveDisplacedAidProps {
    receiveCode: string;
    aid_Id: string | number;
    displaced_Id: number;
    role: UserType;
    employee_Id: number
}

export const receiveDisplacedAid = async ({
    receiveCode,
    aid_Id,
    displaced_Id,
    role,
    employee_Id,
}: receiveDisplacedAidProps): Promise<modalActionResponse> => {
    const fakeData: modalActionResponse = {
        status: 200,
        message: `تم تسليم المساعدة بنجاح`,
    };

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////

    try {
        const response = await AqsaAPI.post<modalActionResponse>(`/aids/${aid_Id}/receive-aid`, {
            receiveCode,
            aid_Id,
            displaced_Id,
            role,
            employee_Id,
        });

        if (response.data.status == 200) {
            return {
                status: 200,
                message: `تم تسليم المساعدة بنجاح`,
            };
        }

        throw new Error("حدث خطأ أثناء تسليم المساعدة");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تسليم المساعدة";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
