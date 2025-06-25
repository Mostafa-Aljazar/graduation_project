'use server';

import { AqsaAPI } from '@/services';
import { FAKE_STORIES } from '@/content/landing/fake-data';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';

interface updateSuccessStoryProps {
    id: number;
    title: string;
    content: string;
    brief?: string;
    imageUrls?: string[];
}

export const updateSuccessStory = async ({
    id,
    title,
    content,
    brief = "",
    imageUrls,
}: updateSuccessStoryProps): Promise<modalActionResponse> => {
    // Validate the ID
    if (!id || isNaN(id)) {
        return {
            status: "400",
            message: "رقم القصة غير صالح",
            error: "يجب تقديم رقم قصة صالح",
        };
    }

    // Fake data implementation
    const fakeStory = FAKE_STORIES.find(story => story.id === id);
    if (fakeStory) {
        fakeStory.title = title;
        fakeStory.content = content;
        fakeStory.brief = brief || fakeStory.brief;
        fakeStory.imgs = imageUrls || fakeStory.imgs;

        return {
            status: "200",
            message: "تم تحديث القصة بنجاح",
            error: undefined,
        };
    }

    return {
        status: "404",
        message: "القصة غير موجودة",
        error: "لم يتم العثور على القصة المطلوبة",
    };

    // Real API implementation
    try {
        const response = await AqsaAPI.put<modalActionResponse>(`/landing/success-stories/${id}`, {
            title,
            content,
            brief,
            imageUrls,
        });

        if (response.status === 200) {
            return {
                status: '200',
                message: response.data?.message || 'تم تحديث القصة بنجاح',
                error: undefined,
            };
        }

        return {
            status: response.status.toString(),
            message: 'حدث خطأ أثناء تحديث القصة',
            error: response.data?.error || 'حدث خطأ غير متوقع',
        };
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error ||
            error.message ||
            'حدث خطأ أثناء تحديث القصة';
        return {
            status: error.response?.status?.toString() || '500',
            message: errorMessage,
            error: errorMessage,
        };
    }
};