'use server';

import { TYPE_AIDS, TYPE_GROUP_AIDS } from '@/content/actor/manager/aids-management';
import { AidsResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { getFakeAidsResponse } from '@/content/actor/general/fake-aids';
import { USER_TYPE, UserType } from '@/constants/userTypes';

export interface getAidsProps {
    actor_Id: number;
    role: Exclude<
        (typeof USER_TYPE)[UserType],
        | typeof USER_TYPE.SECURITY_OFFICER
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

// FIXME:
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
    // console.log("🚀 ~ fakeResponse:", fakeResponse)
    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 2000);
    });

    /////////////////////////////////////////////////////////////
    // REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    // try {
    //     const params: Record<string, any> = { page, limit };
    //     // if (type && type !== TYPE_AIDS.ALL_AIDS) params.type = type;
    //     if (date_range && (date_range as Date[]).length > 0) {
    //         params.date_range = (date_range as Date[])
    //             .map(d => d.toISOString().split('T')[0])
    //             .join(',');
    //     }
    //     if (recipients_range && (recipients_range as number[])[0] !== null) {
    //         params.recipients_range = (recipients_range as number[]).join(',');
    //     }
    //     params.type_group_aids = (type_group_aids as TYPE_GROUP_AIDS);

    //     const response = await AqsaAPI.get('/manager/aids', { params });
    //     if (response.data?.aids) {
    //         return {
    //             status: '200',
    //             message: 'تم جلب المساعدات بنجاح',
    //             aids: response.data.aids,
    //             pagination: response.data.pagination || {
    //                 page,
    //                 limit,
    //                 totalItems: response.data.aids.length,
    //                 totalPages: Math.ceil(response.data.aids.length / limit),
    //             },
    //         };
    //     }
    //     throw new Error('بيانات المساعدات غير متوفرة');
    // } catch (error: any) {
    //     const errorMessage =
    //         error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب المساعدات';
    //     return {
    //         status: error.response?.status?.toString() || '500',
    //         message: errorMessage,
    //         aids: [],
    //         pagination: {
    //             page: 1,
    //             limit: 0,
    //             totalItems: 0,
    //             totalPages: 0,
    //         },
    //         error: errorMessage,
    //     };
    // }
};