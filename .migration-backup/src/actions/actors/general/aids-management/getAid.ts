
'use server';

import { Aid, AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_RANK, USER_TYPE, UserRank } from '@/constants/userTypes';
import { getFakeAidResponse } from '@/content/actor/general/aids/fake-aids';
import { AqsaAPI } from '@/services';

export interface getAidProps {
    aid_Id: number;
    actor_Id: number;
    role: Exclude<
        (typeof USER_RANK)[UserRank],
        | typeof USER_RANK.SECURITY_OFFICER
        | typeof USER_TYPE.DISPLACED
        | typeof USER_TYPE.SECURITY
    >;
};

export const getAid = async ({ aid_Id, actor_Id, role }: getAidProps): Promise<AidResponse> => {

    const fakeResponse: AidResponse = getFakeAidResponse({ aid_Id, actor_Id, role });
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.get<AidResponse>(`/aids/${aid_Id}`, {
            params: {
                actor_Id, role
            },
        });

        if (response.data?.aid) {
            return response.data
        }

        throw new Error('بيانات المساعدة غير متوفرة');

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب بيانات المساعدة';

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            aid: {} as Aid,
            error: errorMessage,
        };

    }
};

