'use server';

import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { AqsaAPI } from '@/services';

interface updateAdProps {
    id: string;
    title: string;
    content: string;
    brief?: string;
    imageUrls?: string[];
}

export const updateAd = async ({
    id,
    title,
    content,
    brief = "",
    imageUrls,
}: updateAdProps): Promise<modalActionResponse> => {
    // Validate the ID
    if (!id || isNaN(parseInt(id))) {
        return {
            status: "400",
            message: "رقم الإعلان غير صالح",
            error: "يجب تقديم رقم إعلان صالح",
        };
    }

    // Simulate a fake response for now (similar to addAd)
    const fakeData: modalActionResponse = {
        status: "200",
        message: `تم تحديث الإعلان بنجاح`,
    };

    // Simulate API delay for fake data
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    try {
        // Send the payload to update the ad using a PUT request
        const response = await AqsaAPI.put<modalActionResponse>(`/ads/update/${id}`, {
            title,
            content,
            brief,
            imageUrls: imageUrls,
        });

        // Check if the response status indicates success
        if (response.status === 200) {
            return {
                status: '200',
                message: 'تم تحديث الإعلان بنجاح',
                error: undefined,
            };
        }

        // If the response status is not 200, treat it as an error
        return {
            status: response.status.toString(),
            message: 'حدث خطأ أثناء تحديث الإعلان',
            error: response.data?.error || 'حدث خطأ غير متوقع',
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'حدث خطأ أثناء تحديث الإعلان';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            error: errorMessage,
        };
    }
};