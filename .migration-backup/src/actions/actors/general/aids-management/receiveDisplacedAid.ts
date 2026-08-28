"use server";

import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { USER_TYPE, UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface receiveDisplacedAidProps {
    receive_code: string;
    aid_Id: number;
    displaced_Id: number;
    actor_Id: number;
    role: Exclude<
        (typeof USER_TYPE)[UserType],
        typeof USER_TYPE.DISPLACED | typeof USER_TYPE.SECURITY
    >;
}

export const receiveDisplacedAid = async ({
    receive_code,
    aid_Id,
    displaced_Id,
    role,
    actor_Id,
}: receiveDisplacedAidProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
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
        const response = await AqsaAPI.post<commonActionResponse>(`/aids/${aid_Id}/receive-aid`, {
            receive_code,
            aid_Id,
            displaced_Id,
            role,
            actor_Id,
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
