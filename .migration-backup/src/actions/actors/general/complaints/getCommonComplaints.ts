'use server';

import { AqsaAPI } from '@/services';
import { ComplaintResponse } from '@/@types/actors/general/Complaints/ComplaintsResponse.type';
import { UserRank, UserType } from '@/constants/userTypes';
import { fakeComplaintsResponse } from '@/content/actor/general/complaints/fake-complaints';
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
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeResponse);
        }, 500);
    });

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.get<ComplaintResponse>('/complaints', {
            params: {
                actor_Id,
                role,
                page,
                limit,
                complaint_type,
                status,
                date_range,
                search: search.trim(),
            }
        });

        if (response.data?.complaints) {
            return response.data
        }

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
