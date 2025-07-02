'use server';

import { AqsaAPI } from '@/services';
import { UserType } from '@/constants/userTypes';
import { COMPLAINTS_STATUS } from '@/content/actor/delegate/complaints';
import { displacedComplaintFilterFormValues } from '@/validation/actor/displaced/complaints/displacedComplaintsSchema';
import { DisplacedComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { fakeDisplacedComplaints } from '@/content/actor/displaced/fake-displaced-complaints';

interface getDisplacedComplaintsProps {
    page?: number;
    limit?: number;
    status?: COMPLAINTS_STATUS;
    receiver_type?: UserType | null;
    displaced_ID: number;
    date_range?: displacedComplaintFilterFormValues['date_range'];
}

export async function getDisplacedComplaints({
    page = 1,
    limit = 5,
    status = COMPLAINTS_STATUS.ALL,
    receiver_type = null,
    displaced_ID,
    date_range = [null, null],
}: getDisplacedComplaintsProps): Promise<DisplacedComplaintResponse> {

    // Fake data for development
    const fakeData: DisplacedComplaintResponse = fakeDisplacedComplaints;

    // Apply pagination
    const totalItems = fakeData.pagination.totalItems;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedComplaints = fakeData.complaints.slice((page - 1) * limit, page * limit);

    const fakeResponse: DisplacedComplaintResponse = {
        ...fakeData,
        complaints: paginatedComplaints,
        pagination: { page, limit, totalItems, totalPages },
    };

    // Simulate API delay
    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 1000));


    // Real implementation
    try {
        const params: Record<string, string | number> = { page, limit };
        if (status && status !== COMPLAINTS_STATUS.ALL) params.status = status;
        if (receiver_type !== null) params.sender_type = receiver_type as string;
        if (date_range && date_range[0] && date_range[1]) {
            params.date = date_range.join(',');
        }
        params.displaced_ID = displaced_ID as number; // Explicit null check

        const response = await AqsaAPI.get('/displaced/complaints', { params });
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
