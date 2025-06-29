'use server';

import { AqsaAPI } from '@/services';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/content/actor/delegate/complaints';
import { DelegateComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { fakeDelegateComplaintsData } from '@/content/actor/delegate/fakeDelegateComplaintsData';
import { delegateComplaintFilterFormValues } from '@/validation/actor/delegate/complaints/delegateComplaintsSchema';

interface getDelegatesComplaintsProps {
    page?: number;
    limit?: number;
    status?: COMPLAINTS_STATUS;
    date_range?: delegateComplaintFilterFormValues['date_range'];
    search?: string;
    type: COMPLAINTS_TABS;
    delegate_ID: number;
}



export async function getDelegatesComplaints({
    page = 1,
    limit = 5,
    status = COMPLAINTS_STATUS.ALL,
    date_range = [null, null],
    search = '',
    type,
    delegate_ID
}: getDelegatesComplaintsProps): Promise<DelegateComplaintResponse> {
    // Fake data for development
    const fakeData = fakeDelegateComplaintsData;

    // Apply pagination
    const totalItems = fakeData.pagination.totalItems;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedComplaints = fakeData.complaints.slice((page - 1) * limit, page * limit);

    const fakeResponse: DelegateComplaintResponse = {
        ...fakeData,
        complaints: paginatedComplaints,
        pagination: { page, limit, totalItems, totalPages },
    };

    // Simulate API delay
    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 1000));

    // Real implementation
    try {
        const params: Record<string, string | number> = { page, limit, type };
        if (status && status !== COMPLAINTS_STATUS.ALL) params.status = status;
        if (delegate_ID) params.delegate_ID = delegate_ID;
        if (date_range && date_range[0] && date_range[1]) params.date = date_range.join(',');

        const response = await AqsaAPI.get('/delegate/complaints', { params });
        if (!response.data?.complaints) {
            throw new Error('بيانات الشكاوى غير متوفرة');
        }

        return {
            status: '200',
            message: 'تم جلب الشكاوى بنجاح',
            complaints: response.data.complaints,
            pagination: response.data.pagination || {
                page,
                limit,
                totalItems: response.data.complaints.length,
                totalPages: Math.ceil(response.data.complaints.length / limit),
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
