'use server';

import { AqsaAPI } from '@/services';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/content/actor/delegate/complaints';
import { ComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { delegateComplaintFilterFormValues } from '@/validation/actor/delegate/complaints/delegateComplaintsSchema';
import { USER_TYPE, UserType } from '@/constants/userTypes';
import { fakeComplaintResponse, fakeComplaints } from '@/content/actor/common/complaints/fakeComplaints';
import { CommonComplaintFilterFormValues } from '@/validation/actor/general/complaints/commonComplaintsSchema';

interface GetDelegatesComplaintsProps {
    page?: number;
    limit?: number;
    status?: COMPLAINTS_STATUS;
    date_range?: [string | null, string | null];
    search?: string;
    type: COMPLAINTS_TABS;
    actor_Id: number;
    role: Exclude<
        (typeof USER_TYPE)[UserType],
        typeof USER_TYPE.SECURITY_OFFICER
    >;
}

export async function getCommonComplaints({
    page = 1,
    limit = 5,
    status = COMPLAINTS_STATUS.ALL,
    date_range = [null, null],
    search = '',
    type,
    role,
    actor_Id,
}: GetDelegatesComplaintsProps): Promise<ComplaintResponse> {

    // const fakeComplaintsData = fakeComplaints.filter((item => item.receiver.role == role));
    const fakeComplaintsData = fakeComplaints
    const totalItems = fakeComplaintsData.length;
    const totalPages = Math.ceil(totalItems / limit);

    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({
                ...fakeComplaintResponse,
                complaints: fakeComplaintsData.slice((page - 1) * limit, page * limit),
                pagination: { page, limit, totalItems, totalPages },
            });
        }, 500)
    );

    try {
        const params: Record<string, string | number> = {
            page,
            limit,
            type,
            actor_Id,
            role,
        };

        if (status !== COMPLAINTS_STATUS.ALL) {
            params.status = status;
        }

        if (date_range?.[0] && date_range?.[1]) {
            params.date = date_range.join(',');
        }

        if (search?.trim()) {
            params.search = search.trim();
        }

        const { data } = await AqsaAPI.get('/complaints', { params });

        if (!data?.complaints) {
            throw new Error('بيانات الشكاوى غير متوفرة');
        }

        const totalItems = data.pagination?.totalItems || data.complaints.length;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            status: '200',
            message: 'تم جلب الشكاوى بنجاح',
            complaints: data.complaints,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
            },
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب الشكاوى';

        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            complaints: [],
            pagination: { page: 1, limit: 0, totalItems: 0, totalPages: 0 },
            error: errorMessage,
        };
    }
}
