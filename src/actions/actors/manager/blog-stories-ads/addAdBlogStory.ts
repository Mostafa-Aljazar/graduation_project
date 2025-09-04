'use server';

import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { commonActionResponse } from '@/@types/common/action/commonActionResponse.type';
import { AqsaAPI } from '@/services';

// TODO:add type
export interface addAdBlogStoryProps {
    title: string;
    content: string;
    brief?: string,
    image_urls?: string[];
    type: TYPE_WRITTEN_CONTENT;
}

export const addAdBlogStory = async ({
    title,
    content,
    brief = "",
    image_urls,
    type
}: addAdBlogStoryProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم إضافة المحتوى بنجاح`,
    }

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });


    try {

        const response = await AqsaAPI.post<commonActionResponse>(`/written-content/`, {
            title,
            content,
            brief,
            image_urls: image_urls,
            type
        });

        if (response.status === 200) {
            return {
                status: 200,
                message: 'تم تحديث إضافة بنجاح',
                error: undefined,
            };
        }

        return {
            status: response.status,
            message: 'حدث خطأ أثناء إضافة المحتوى',
            error: response.data?.error || 'حدث خطأ غير متوقع',
        };

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء إضافة المحتوى";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};
