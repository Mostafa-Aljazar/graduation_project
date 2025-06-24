
'use server';

import { Aid, AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { fakeAids } from '@/content/actor/general/fake-aids';
import { fakeAidsResponse } from '@/content/actor/manager/fake-aids';
import { AqsaAPI } from '@/services';

type Props = {
    id: number;
};

export const getAid = async ({ id }: Props): Promise<AidResponse> => {

    const aid = fakeAids.filter(aid => aid.id == id)
    console.log("🚀 ~ getAid ~ aid:", aid)

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: '200',
                message: 'تم جلب بيانات المساعدة بنجاح',
                aid: aid[0],
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
            aid: {} as Aid,
            error: errorMessage,
        };
    }
};

