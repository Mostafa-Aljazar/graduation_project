'use server';

import { AqsaAPI } from '@/services';
import { UserType } from '@/constants/userTypes';
import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import { ManagerComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { fakeManagerComplaintsData } from '@/content/actor/manager/fakeManagerComplaintsData';
import { managerComplaintFilterFormValues } from '@/validation/actor/manager/complaints/managerComplaintsSchema';

interface getManagerComplaintsProps {
    page?: number;
    limit?: number;
    status?: COMPLAINTS_STATUS;
    sender_type?: UserType | null;
    delegate_id?: number | null;
    date_range?: managerComplaintFilterFormValues['date_range'];
    search?: string;

}

export async function getManagerComplaints({
    page = 1,
    limit = 5,
    status = COMPLAINTS_STATUS.ALL,
    sender_type = null,
    delegate_id = null,
    date_range = [null, null],
    search = '',
}: getManagerComplaintsProps): Promise<ManagerComplaintResponse> {
    // Fake data for development
    const fakeData = fakeManagerComplaintsData;

    // Apply filters

    // Apply pagination
    const totalItems = fakeData.pagination.totalItems;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedComplaints = fakeData.complaints.slice((page - 1) * limit, page * limit);

    const fakeResponse: ManagerComplaintResponse = {
        ...fakeData,
        complaints: paginatedComplaints,
        pagination: { page, limit, totalItems, totalPages },
    };

    // Simulate API delay
    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 2000));

    // Real implementation
    try {
        const params: Record<string, string | number> = { page, limit };
        if (status && status !== COMPLAINTS_STATUS.ALL) params.status = status;
        if (sender_type !== null) params.sender_type = sender_type as string;
        if (delegate_id !== null) params.delegate_id = delegate_id as number; // Explicit null check
        if (date_range && date_range[0] && date_range[1]) {
            params.date = date_range.join(',');
        }

        const response = await AqsaAPI.get('/manager/complaints', { params });
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
