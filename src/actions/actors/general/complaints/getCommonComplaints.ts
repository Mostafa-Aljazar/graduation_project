'use server';

import { AqsaAPI } from '@/services';
import { ComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { UserRank, UserType } from '@/constants/userTypes';
import { fakeComplaints, fakeComplaintsResponse } from '@/content/actor/common/complaints/fake-complaints';
import { CommonComplaintFilterFormValues } from '@/validation/actor/general/complaints/commonComplaintsSchema';
import { COMPLAINTS_STATUS, COMPLAINTS_TABS } from '@/@types/actors/common-types/index.type';

export interface GetCommonComplaintsProps {
    page?: number;
    limit?: number;
    status?: COMPLAINTS_STATUS;
    date_range?: [string | null, string | null];
    search?: string;
    complaint_type: COMPLAINTS_TABS;
    actor_Id: number;
    role: UserType | UserRank
}

export async function getCommonComplaints({
    page = 1,
    limit = 5,
    status = COMPLAINTS_STATUS.ALL,
    date_range = [null, null],
    search = '',
    complaint_type,
    role,
    actor_Id,
}: GetCommonComplaintsProps): Promise<ComplaintResponse> {

    const fakeResponse = fakeComplaintsResponse({ page, limit, status, date_range, search, complaint_type, role, actor_Id })

    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 1000));


    try {
        const response = await AqsaAPI.post('/complaints', {
            actor_Id,
            role,
            page,
            limit,
            complaint_type,
            status,
            date_range,
            search: search.trim(),
        });


        return {
            status: 200,
            message: 'تم جلب الشكاوى بنجاح',
            complaints: response.data.complaints,
            pagination: response.data.pagination || {
                page,
                limit,
                total_items: response.data.complaints.length,
                total_pages: Math.ceil(response.data.complaints.length / limit),
            },
        };


        throw new Error("بيانات الشكاوى غير متوفرة");

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب الشكاوى';

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            complaints: [],
            pagination: { page: 1, limit: 0, total_items: 0, total_pages: 0 },
            error: errorMessage,
        };
    }

}
