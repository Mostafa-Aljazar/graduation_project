
'use server';

import { Aid, AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { fakeAids } from '@/content/actor/general/fake-aids';
import { AqsaAPI } from '@/services';

type Props = {
    id: number;
    actor_Id: number;
    role: Exclude<
        (typeof USER_TYPE)[UserType],
        | typeof USER_TYPE.SECURITY_OFFICER
        | typeof USER_TYPE.DISPLACED
        | typeof USER_TYPE.SECURITY
    >;
};

export const getAid = async ({ id, actor_Id,
    role }: Props): Promise<AidResponse> => {

    const aid = fakeAids.filter(aid => aid.id == id)

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
        const response = await AqsaAPI.get(`/aids/${id}`, {
            params: {
                actor_Id, role
            },
        });

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

