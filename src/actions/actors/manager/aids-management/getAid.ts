
'use server';

import { AddAidPayload, AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { fakeAidsResponse } from '@/content/actor/manager/fake-aids';
import { AqsaAPI } from '@/services';

type Props = {
    id: number | string;
};

export const getAid = async ({ id }: Props): Promise<AidResponse> => {

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({

                status: '200',
                message: 'تم جلب بيانات المساعدة بنجاح',
                aid: fakeAidsResponse.aids[0],
            });
        }, 1000);
    });

    // Real implementation below, if needed
    try {
        const response = await AqsaAPI.get(`/manager/aids/${id}`);
        return {
            status: '200',
            message: 'تم جلب بيانات المساعدة بنجاح',
            aid: response.data.aid,
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب بيانات المساعدة';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            aid: {} as AddAidPayload,
            error: errorMessage,
        };
    }
};

