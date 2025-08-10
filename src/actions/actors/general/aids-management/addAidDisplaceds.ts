"use server";

import { modalActionResponse } from "@/@types/common/modal/modalActionResponse.type";
import { USER_RANK, USER_TYPE, UserRank, UserType } from "@/constants/userTypes";
import { AqsaAPI } from "@/services";

export interface addAidDisplacedsProps {
    aid_Id: number;
    displaceds_Ids: number[];
    actor_Id: number;
    role: Exclude<
        (typeof USER_RANK)[UserRank],
        typeof USER_RANK.SECURITY_OFFICER | typeof USER_TYPE.SECURITY | typeof USER_TYPE.DISPLACED
    >;
}

export const addAidDisplaceds = async ({
    aid_Id,
    displaceds_Ids,
    actor_Id,
    role,
}: addAidDisplacedsProps): Promise<modalActionResponse> => {

    const fakeData: modalActionResponse = {
        status: 200,
        message: 'تم إضافة النازحين للمساعدة بنجاح',

    }
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.post<modalActionResponse>(`/aids/${aid_Id}/add-displaceds`, {
            aid_Id,
            displaceds_Ids,
            actor_Id,
            role,
        });

        if (response.data) {
            return {
                status: 200,
                message: 'تم إضافة النازحين للمساعدة بنجاح',
            };
        }

        return {
            status: 500,
            message: "حدث خطأ أثناء إضافة النازحين للمساعدة",
            error: "حدث خطأ أثناء إضافة النازحين للمساعدة",
        };

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة النازحين للمساعدة";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};