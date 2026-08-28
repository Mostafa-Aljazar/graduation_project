"use server";

import { TYPE_WRITTEN_CONTENT } from "@/@types/actors/common-types/index.type";
import { commonActionResponse } from "@/@types/common/action/commonActionResponse.type";
import { AqsaAPI } from "@/services";

export interface deleteAdBlogStoryProps {
    content_Id: number;
    manager_Id: number;
    type: TYPE_WRITTEN_CONTENT
}

export const deleteAdBlogStory = async ({
    content_Id,
    manager_Id,
    type
}: deleteAdBlogStoryProps): Promise<commonActionResponse> => {
    const fakeData: commonActionResponse = {
        status: 200,
        message: `تم حذف المحتوى بنجاح`,

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

        const response = await AqsaAPI.delete<commonActionResponse>(`/written-content`, {
            params: {
                type, content_Id, manager_Id
            }
        });

        return {
            status: 200,
            message: `تم حذف المحتوى بنجاح`,
        };

    } catch (error: any) {

        const errorMessage =
            error.response?.data?.error || error.message || "حدث خطأ أثناء حذف المحتوى";

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            error: errorMessage,
        };

    }
};