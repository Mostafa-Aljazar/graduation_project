'use server';

import { AidsResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getFakeAidsResponse } from '@/content/actor/general/fake-aids';
import { USER_RANK, USER_TYPE, UserRank } from '@/constants/userTypes';
import { TYPE_AIDS, TYPE_GROUP_AIDS } from '@/@types/actors/common-types/index.type';
import { AqsaAPI } from '@/services';

export interface getAidsProps {
    actor_Id: number;
    role: Exclude<
        (typeof USER_RANK)[UserRank],
        | typeof USER_RANK.SECURITY_OFFICER
        | typeof USER_TYPE.DISPLACED
        | typeof USER_TYPE.SECURITY
    >;
    page?: number;
    limit?: number;
    type?: TYPE_AIDS | null;
    date_range?: [string | null, string | null];
    recipients_range?: [number | null, number | null]
    type_group_aids?: TYPE_GROUP_AIDS
};

export const getAids = async ({
    actor_Id,
    role,
    page = 1,
    limit = 5,
    type = null,
    date_range = [null, null],
    recipients_range = [null, null],
    type_group_aids
}: getAidsProps): Promise<AidsResponse> => {

    const fakeResponse: AidsResponse = getFakeAidsResponse({ page, limit, aid_status: type_group_aids });
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaAPI.get<AidsResponse>('/aids', {
            params: {
                actor_Id,
                role,
                page,
                limit,
                type,
                date_range,
                recipients_range,
                type_group_aids
            }
        });

        if (response.data?.aids) {
            return response.data
        }

        throw new Error('بيانات المساعدات غير متوفرة');

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب المساعدات';

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            aids: [],
            pagination: {
                page: 1,
                limit: 0,
                total_items: 0,
                total_pages: 0,
            },
            error: errorMessage,
        };
    }

};