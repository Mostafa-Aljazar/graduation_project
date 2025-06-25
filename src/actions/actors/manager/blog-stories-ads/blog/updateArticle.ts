'use server';

import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { AqsaAPI } from '@/services';

interface updateArticleProps {
    id: number;
    title: string;
    content: string;
    brief?: string;
    imageUrls?: string[];
}

export const updateArticle = async ({
    id,
    title,
    content,
    brief = "",
    imageUrls,
}: updateArticleProps): Promise<modalActionResponse> => {
    // Simulate a fake response for now (similar to addArticle)
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تحديث المقال بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    try {
        // Send the payload to update the article using a PUT or PATCH request
        const response = await AqsaAPI.put<modalActionResponse>(`/articles/update/${id}`, {
            title,
            content,
            brief,
            imageUrls: imageUrls,
        });

        // Check if the response status indicates success
        if (response.status === 200) {
            return {
                status: '200',
                message: 'تم تحديث المقال بنجاح',
            };
        }

        // If the response status is not 200, treat it as an error
        return {
            status: response.status.toString(),
            message: 'حدث خطأ أثناء تحديث المقال',
            error: response.data?.error || 'حدث خطأ غير متوقع',
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'حدث خطأ أثناء تحديث المقال';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            error: errorMessage,
        };
    }
};