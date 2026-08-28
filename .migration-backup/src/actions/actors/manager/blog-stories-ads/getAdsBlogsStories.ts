"use server";
import { AqsaGuestAPI } from "@/services";
import { TYPE_WRITTEN_CONTENT } from "@/@types/actors/common-types/index.type";
import { fakeWrittenContentsResponse } from "@/content/actor/manager/fake-data/fake-ads-blogs-stories";
import { AdsBlogsStoriesResponse } from "@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type";

export interface getAdsBlogsStoriesProps {
    page?: number;
    limit?: number;
    type: TYPE_WRITTEN_CONTENT;
}

export const getAdsBlogsStories = async ({ page = 1, limit = 5, type }: getAdsBlogsStoriesProps): Promise<AdsBlogsStoriesResponse> => {

    const fakeResponse: AdsBlogsStoriesResponse = fakeWrittenContentsResponse({ page, limit, type })

    return new Promise((resolve) => setTimeout(() => resolve(fakeResponse), 500));

    /////////////////////////////////////////////////////////////
    // FIXME: THIS IS THE REAL IMPLEMENTATION
    /////////////////////////////////////////////////////////////
    try {

        const response = await AqsaGuestAPI.get<AdsBlogsStoriesResponse>('/written-content',
            {
                params: {
                    type, page, limit
                }
            });

        if (response.data?.ads_blogs_stories) {
            return response.data
        }

        throw new Error('بيانات المحتوى غير متوفرة');

    } catch (error: any) {
        const errorMessage =
            error.response?.data?.error || error.message || 'حدث خطأ أثناء جلب بيانات المحتوى';

        return {
            status: error.response?.status || 500,
            message: errorMessage,
            ads_blogs_stories: [],
            pagination: { page: 1, limit: 0, total_items: 0, total_pages: 0 },
            error: errorMessage,
        };
    }
};
