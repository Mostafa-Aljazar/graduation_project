
'use server';

import { AddAidPayload, AidResponse } from '@/@types/actors/manager/aid-management/add-aid-management.types';
import { TYPE_AIDS, QUANTITY_AVAILABILITY, DISTRIBUTION_METHOD, DISTRIBUTION_MECHANISM, DELEGATE_PORTIONS } from '@/content/actor/manager/aids-management';
import { AqsaAPI } from '@/services';

type Props = {
    id: number | string;
};

export const getAid = async ({ id }: Props): Promise<AidResponse> => {
    const fakeAid: AddAidPayload = {
        id: 123,
        aidName: 'توزيع أدوات مدرسية',
        aidType: TYPE_AIDS.EDUCATIONAL_AID,
        aidContent: 'لوازم مدرسية متنوعة',
        deliveryDate: new Date('2025-05-27'),
        deliveryLocation: 'مخيم الجنوب',
        securityRequired: true,
        quantityAvailability: QUANTITY_AVAILABILITY.limited,
        existingQuantity: 100,
        singlePortion: 4,
        distributionMethod: DISTRIBUTION_METHOD.equal,
        selectedCategories: [
            { id: 'cat-1', label: 'أطفال', min: 0, max: 12, isDefault: true, portion: 2 },
            { id: 'cat-2', label: 'مراهقين', min: 13, max: 18, portion: 2 },
        ],
        distributionMechanism: DISTRIBUTION_MECHANISM.displaced_families,
        delegatesPortions: DELEGATE_PORTIONS.equal,
        delegateSinglePortion: 0,
        selectedDisplacedIds: ["D001", "D002", "D003"],
        selectedDelegatesPortions: [
            // { delegate_id: 'del-1', portion: 30 },
            // { delegate_id: 'del-2', portion: 20 },
        ],
        aidAccessories: "Accessories" as string,
        receivedDisplaced: [{
            displaced: "D001",
            receivedTime: new Date('2025-05-27')
        }, {
            displaced: "D002",
            receivedTime: new Date('2025-05-28')
        }]

    };

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({

                status: '200',
                message: 'تم جلب بيانات المساعدة بنجاح',
                aid: fakeAid,
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

