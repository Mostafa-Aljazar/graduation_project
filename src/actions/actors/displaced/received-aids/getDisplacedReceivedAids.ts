'use server';

import { AqsaAPI } from '@/services';
import { DISPLACED_RECEIVED_AIDS_TABS } from '@/content/actor/displaced/received-aid';
import { fakeDisplacedReceivedAids } from '@/content/actor/displaced/fake-displaced-received-aids';
import { DisplacedReceivedAidsResponse } from '@/@types/actors/displaced/received-aids/displacedReceivedAidsResponse.type';

interface GetDisplacedReceivedAidsProps {
    displaced_ID: number;
    page?: number;
    limit?: number;
    tabType?: DISPLACED_RECEIVED_AIDS_TABS;
}

export async function getDisplacedReceivedAids({
    displaced_ID,
    page = 1,
    limit = 10,
    tabType,
}: GetDisplacedReceivedAidsProps): Promise<DisplacedReceivedAidsResponse> {
    const allFake = fakeDisplacedReceivedAids;

    const filtered = tabType
        ? allFake.filter((aid) => aid.tabType === tabType)
        : allFake;

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit);

    const paginatedAids = filtered.slice((page - 1) * limit, page * limit);

    const fakeResponse: DisplacedReceivedAidsResponse = {
        status: '200',
        receivedAids: paginatedAids,
        pagination: { page, limit, totalItems, totalPages },
    };

    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 1000));

    try {
        const params: Record<string, string | number> = { page, limit, displaced_ID };
        if (tabType) params.tabType = tabType as string;

        const response = await AqsaAPI.get(`/displaceds/${displaced_ID}/aids`, { params });

        if (!response.data?.receivedAids) {
            throw new Error('بيانات المساعدات غير متوفرة');
        }

        return {
            status: '200',
            message: 'تم جلب المساعدات بنجاح',
            receivedAids: response.data.receivedAids,
            pagination: response.data.pagination || {
                page,
                limit,
                totalItems: response.data.receivedAids.length,
                totalPages: Math.ceil(response.data.receivedAids.length / limit),
            },
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب المساعدات';

        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            error: errorMessage,
            receivedAids: [],
            pagination: { page: 1, limit: 0, totalItems: 0, totalPages: 0 },
        };
    }
}
