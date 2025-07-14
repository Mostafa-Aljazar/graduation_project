'use server';

import { AqsaAPI } from '@/services';
import { fakeDisplacedReceivedAidsResponse } from '@/content/actor/displaced/fake-data/fake-displaced-received-aids';
import { DisplacedReceivedAidsResponse } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';
import { DISPLACED_RECEIVED_AIDS_TABS } from '@/@types/actors/common-types/index.type';

export interface GetDisplacedReceivedAidsProps {
    displaced_Id: number;
    page?: number;
    limit?: number;
    tab_type?: DISPLACED_RECEIVED_AIDS_TABS;
}

export async function getDisplacedReceivedAids({
    displaced_Id,
    page = 1,
    limit = 10,
    tab_type,
}: GetDisplacedReceivedAidsProps): Promise<DisplacedReceivedAidsResponse> {
    const fakeResponse = fakeDisplacedReceivedAidsResponse({ displaced_Id, page, limit, tab_type })

    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 1000));

    try {

        const response = await AqsaAPI.post(`/displaceds/${displaced_Id}/received-aids`, {
            page,
            limit,
            tab_type,
        });

        if (!response.data?.receivedAids) {
            throw new Error('بيانات المساعدات غير متوفرة');
        }

        return {
            status: 200,
            message: 'تم جلب المساعدات بنجاح',
            received_aids: response.data.receivedAids,
            pagination: response.data.pagination || {
                page,
                limit,
                total_items: response.data.receivedAids.length,
                total_pages: Math.ceil(response.data.receivedAids.length / limit),
            },
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب المساعدات';

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
            received_aids: [],
            pagination: { page: 1, limit: 0, total_items: 0, total_pages: 0 },
        };
    }
}
