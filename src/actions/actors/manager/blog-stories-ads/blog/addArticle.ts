'use server';

import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { AqsaAPI } from '@/services';


interface addArticleProps {
    title: string;
    content: string;
    brief?: string;
    imageUrls?: string[];
}

export const addArticle = async ({
    title,
    content,
    brief = "",
    imageUrls,
}: addArticleProps): Promise<modalActionResponse> => {

    // FIXME:
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم إضافة المقال بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });


    try {
        // Send the payload directly without wrapping in a `data` object
        const response = await AqsaAPI.post<modalActionResponse>('/articles/add', {
            title,
            content,
            brief,
            imageUrls: imageUrls,
        });

        // Check if the response status indicates success
        if (response.status === 200) {
            return {
                status: '200',
                message: 'تم إضافة المقال بنجاح',
            };
        }

        // If the response status is not 200, treat it as an error
        return {
            status: response.status.toString(),
            message: 'حدث خطأ أثناء إضافة المقال',
            error: response.data?.error || 'حدث خطأ غير متوقع',
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'حدث خطأ أثناء إضافة المقال';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            error: errorMessage,
        };
    }
};
