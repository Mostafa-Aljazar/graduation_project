'use server';

import { AqsaAPI } from '@/services';
import { TYPE_AIDS, TYPE_GROUP_AIDS } from '@/content/actor/manager/aids-management';
import { AidsResponse } from '@/@types/actors/general/aids/aidsResponse.type';

type Props = {
    page?: number;
    limit?: number;
    type?: TYPE_AIDS | null;
    date_range?: Date[] | null;
    recipients_range?: number[] | null;
    type_group_aids: TYPE_GROUP_AIDS
};

export const getAids = async ({
    page = 1,
    limit = 5,
    type = null,
    date_range = null,
    recipients_range = null,
    type_group_aids
}: Props): Promise<AidsResponse> => {


    const fakeData: AidsResponse = {
        status: '200',
        message: 'تم جلب المساعدات بنجاح',
        aids: [
            {
                id: 1,
                type: TYPE_AIDS.FOOD_AID,
                distribution_date: '2024-10-20',
                recipients_number: 50,
                title: 'توزيع مواد غذائية',
                description: 'توزيع حصص غذائية للنازحين في منطقة الشمال',
                complete: true,
            },
            {
                id: 2,
                type: TYPE_AIDS.MEDICAL_AID,
                distribution_date: '2024-10-21',
                recipients_number: 30,
                title: 'توزيع أدوية',
                description: 'توفير أدوية للمرضى في المخيم الشرقي',
                complete: true,
            },
            {
                id: 3,
                type: TYPE_AIDS.FOOD_AID,
                distribution_date: '2025-05-31', // Current date
                recipients_number: 75,
                title: 'توزيع إمدادات غذائية طارئة',
                description: 'توزيع طارئ بمناسبة الأزمة الأخيرة',
                complete: false, // Ongoing aid
            },
            {
                id: 4,
                type: TYPE_AIDS.CLOTHING_AIDS,
                distribution_date: '2025-05-30',
                recipients_number: 40,
                title: 'توزيع ملابس شتوية',
                description: 'توزيع ملابس دافئة للنازحين',
                complete: true,
            },
            {
                id: 5,
                type: TYPE_AIDS.MEDICAL_AID,
                distribution_date: '2025-05-29',
                recipients_number: 20,
                title: 'توزيع معدات طبية',
                description: 'توزيع معدات لدعم العيادات المتنقلة',
                complete: false, // Ongoing aid
            },
            {
                id: 6,
                type: TYPE_AIDS.FOOD_AID,
                distribution_date: '2025-05-28',
                recipients_number: 60,
                title: 'توزيع سلات غذائية',
                description: 'توزيع سلات غذائية أسبوعية',
                complete: true,
            },
            {
                id: 7,
                type: TYPE_AIDS.EDUCATIONAL_AID,
                distribution_date: '2025-05-27',
                recipients_number: 25,
                title: 'توزيع أدوات مدرسية',
                description: 'دعم الأطفال النازحين باللوازم المدرسية',
                complete: false, // Ongoing aid
            },
            {
                id: 8,
                type: TYPE_AIDS.FINANCIAL_AID,
                distribution_date: '2025-05-26',
                recipients_number: 15,
                title: 'دفعة مالية طارئة',
                description: 'دعم مالي للأسر المحتاجة',
                complete: true,
            },
            {
                id: 9,
                type: TYPE_AIDS.CLEANING_AID,
                distribution_date: '2025-05-25',
                recipients_number: 35,
                title: 'توزيع مستلزمات تنظيف',
                description: 'توزيع مواد تنظيف للمخيمات',
                complete: false, // Ongoing aid
            },
            {
                id: 10,
                type: TYPE_AIDS.OTHER_AID,
                distribution_date: '2025-05-24',
                recipients_number: 10,
                title: 'توزيع أغطية',
                description: 'توزيع أغطية للأمطار المتوقعة',
                complete: true,
            },
        ],
        pagination: {
            page: 1,
            limit: 5,
            totalItems: 10,
            totalPages: 2,
        },
    };

    // Apply filters
    let filteredAids = fakeData.aids;

    // Apply pagination
    const totalItems = filteredAids.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedAids = filteredAids.slice(
        (page - 1) * limit,
        page * limit
    );

    const fakeResponse: AidsResponse = {
        ...fakeData,
        aids: paginatedAids,
        pagination: { page, limit, totalItems, totalPages },
    };

    // Simulate API delay
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 2000);
    });

    /////////////////////////////////////////////////////////////
    // REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const params: Record<string, any> = { page, limit };
        if (type && type !== TYPE_AIDS.ALL_AIDS) params.type = type;
        if (date_range && (date_range as Date[]).length > 0) {
            params.date_range = (date_range as Date[])
                .map(d => d.toISOString().split('T')[0])
                .join(',');
        }
        if (recipients_range && (recipients_range as number[])[0] !== null) {
            params.recipients_range = (recipients_range as number[]).join(',');
        }
        params.type_group_aids = (type_group_aids as TYPE_GROUP_AIDS);

        const response = await AqsaAPI.get('/manager/aids', { params });
        if (response.data?.aids) {
            return {
                status: '200',
                message: 'تم جلب المساعدات بنجاح',
                aids: response.data.aids,
                pagination: response.data.pagination || {
                    page,
                    limit,
                    totalItems: response.data.aids.length,
                    totalPages: Math.ceil(response.data.aids.length / limit),
                },
            };
        }
        throw new Error('بيانات المساعدات غير متوفرة');
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب المساعدات';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            aids: [],
            pagination: {
                page: 1,
                limit: 0,
                totalItems: 0,
                totalPages: 0,
            },
            error: errorMessage,
        };
    }
};