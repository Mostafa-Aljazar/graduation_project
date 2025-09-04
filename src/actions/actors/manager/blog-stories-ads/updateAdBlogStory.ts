'use server';

import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { commonActionResponse } from '@/@types/common/action/commonActionResponse.type';
import { AqsaAPI } from '@/services';

export interface updateAdBlogStoryProps {
    id: number;
    title: string;
    content: string;
    brief?: string;
    image_urls?: string[];
    type: TYPE_WRITTEN_CONTENT;
}

export const updateAdBlogStory = async ({
    id,
    title,
    content,
    brief = "",
    image_urls,
    type
}: updateAdBlogStoryProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم تحديث المحتوى بنجاح`,
    }

    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 500);
    });


    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {
        const response = await AqsaAPI.put<commonActionResponse>(`/written-content/${id}`, {
            title,
            content,
            brief,
            image_urls: image_urls,
            type
        });

        if (response.status === 200) {
            return {
                status: 200,
                message: 'تم تحديث المحتوى بنجاح',
                error: undefined,
            };
        }

        return {
            status: response.status,
            message: 'حدث خطأ أثناء تحديث المحتوى',
            error: response.data?.error || 'حدث خطأ غير متوقع',
        };

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء تحديث المحتوى";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };
    }
};