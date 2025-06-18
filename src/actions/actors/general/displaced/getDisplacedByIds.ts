'use server';

import { AqsaAPI } from '@/services';
import type {
    displacedResponse,
    Displaced,
} from '@/@types/actors/general/displaceds/displacesResponse.type';
import { fakeDisplacedResponse } from '@/content/actor/general/fake-displaced';
// import { ALL_DISPLACED } from '@/content/actor/general/displaced';

type Options = {
    ids: (string | number)[];
    page?: number;
    limit?: number;
};

export const getDisplacedByIds = async ({
    ids,
    page = 1,
    limit = 10,
}: Options): Promise<displacedResponse> => {
    // FIXME: Remove fake data logic in production

    const filtered = fakeDisplacedResponse.displaceds.filter((d) =>
        ids.includes(d.id)
    );

    const paginated = filtered.slice((page - 1) * limit, page * limit);

    const fakeData: displacedResponse = {
        status: '200',
        message: 'تم جلب بيانات النازحين (بيانات وهمية)',
        displaceds: paginated,
        pagination: {
            page,
            limit,
            totalItems: filtered.length,
            totalPages: Math.ceil(filtered.length / limit),
        },
    };

    return await new Promise((resolve) => {
        setTimeout(() => resolve(fakeData), 1000);
    });

    // Uncomment for real API usage
    try {
        const response = await AqsaAPI.post('/displaced/by-ids', { ids });
        const displaceds: Displaced[] = response.data.displaceds || [];

        return {
            status: '200',
            message: 'تم جلب بيانات النازحين بنجاح',
            displaceds,
            pagination: {
                page: 1,
                limit: ids.length,
                totalItems: displaceds.length,
                totalPages: 1,
            },
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || '500',
            message: error.message || 'حدث خطأ أثناء جلب بيانات النازحين',
            displaceds: [],
            pagination: {
                page: 1,
                limit: 0,
                totalItems: 0,
                totalPages: 0,
            },
            error: error.message,
        };
    }
};
