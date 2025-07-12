"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { USER_TYPE, UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface addAidDisplacedsProps {
    aid_Id: number;
    displaceds_Ids: number[];

    actor_Id: number;
    role: Exclude<
        (typeof USER_TYPE)[UserType],
        typeof USER_TYPE.SECURITY_OFFICER | typeof USER_TYPE.SECURITY | typeof USER_TYPE.DISPLACED
    >;

}

export const addAidDisplaceds = async ({
    aid_Id,
    displaceds_Ids,
    actor_Id,
    role,
}: addAidDisplacedsProps): Promise<modalActionResponse> => {



    // FIXME: Remove this fake data logic in production
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم إضافة النازحين للمساعدة بنجاح`,

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
        const response = await AqsaAPI.get(`/aids/${aid_Id}/add-displaceds`, {
            params: {
                aid_Id,
                displaceds_Ids,
                actor_Id,
                role,
            },
        });

        return {
            status: "200",
            message: `تم إضافة النازحين للمساعدة بنجاح`,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة النازحين للمساعدة";
        return {
            status: error.response?.status?.toString() || "500",
            message: errorMessage,
            error: errorMessage,
        };
    }
};