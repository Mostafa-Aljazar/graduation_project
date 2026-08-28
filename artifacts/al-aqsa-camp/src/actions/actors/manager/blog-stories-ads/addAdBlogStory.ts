
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
    try {
        const response = await AqsaAPI.post(`/content`, {
            title,
            body: content,
            imageUrl: image_urls?.[0],
            status: "published",
        });

        if (response.status === 201) {
            return {
                status: response.status,
                message: 'تم إضافة المحتوى بنجاح',
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
