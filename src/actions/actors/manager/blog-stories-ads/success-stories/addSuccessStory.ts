'use server';

import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { AqsaAPI } from '@/services';


interface addSuccessStoryProps {
    title: string;
    content: string;
    brief?: string,
    imageUrls?: string[];
}

export const addSuccessStory = async ({
    title,
    content,
    brief = "",
    imageUrls,
}: addSuccessStoryProps): Promise<modalActionResponse> => {

    // FIXME:
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم إضافة القصة بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });


    try {
        const response = await AqsaAPI.post<modalActionResponse>('/success-stories/add', {
            title,
            content,
            brief,
            imageUrls: imageUrls,
        });

        if (response.status === 200) {
            return {
                status: '200',
                message: 'تم إضافة القصة بنجاح',
            };
        }

        return {
            status: response.status.toString(),
            message: 'حدث خطأ أثناء إضافة القصة',
            error: response.data?.error || 'حدث خطأ غير متوقع',
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'حدث خطأ أثناء إضافة القصة';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            error: errorMessage,
        };
    }
};
