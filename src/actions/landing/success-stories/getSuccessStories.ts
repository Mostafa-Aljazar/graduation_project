"use server";
import { AqsaGuestAPI } from "@/services";
import { FAKE_STORIES } from "@/content/landing/fake-data";
import { Article_SuccessStory_Ad, Articles_SuccessStories_Ads_Response } from "@/@types/common/article-successStories-adsResponse.type";

export type getSuccessStoriesProps = {
    page?: number;
    limit?: number;
}

export const getSuccessStories = async ({ page = 1, limit = 5 }: getSuccessStoriesProps): Promise<Articles_SuccessStories_Ads_Response> => {
    // Validate page and limit
    if (page < 1 || limit < 1 || isNaN(page) || isNaN(limit)) {
        return {
            status: "400",
            message: "معاملات التصفح غير صالحة",
            articles_successStories_ads: [],
            error: "يجب تقديم رقم صفحة وحد أقصى صالحين",
            pagination: { total: 0, page, limit, totalPages: 0 },
        };
    }

    //FIXME: Fake data implementation
    const totalStories = 20; // Simulate 20 stories in "database"
    const start = (page - 1) * limit;
    const end = start + limit;

    // Generate varied fake articles if ARTICLE_EXAMPLE is a single object
    let allStories: Article_SuccessStory_Ad[] = [];
    if (Array.isArray(FAKE_STORIES)) {
        allStories = FAKE_STORIES;
    } else {
        allStories = Array(totalStories)
            .fill(null)
            .map((_, index) => ({
                ...(Array.isArray(FAKE_STORIES) ? FAKE_STORIES[0] : FAKE_STORIES),
                id: index + 1,
                title: `${FAKE_STORIES[0].title} ${index + 1}`,
                createdAt: new Date(Date.now() - index * 86400000).toISOString(), // Vary dates
                img: FAKE_STORIES[0].imgs,
                content: FAKE_STORIES[0].title,
            }));
    }



    // Apply pagination
    const paginatedStories = allStories.slice(start, end);

    const fakeData: Articles_SuccessStories_Ads_Response = {
        status: "200",
        message: "تم جلب البيانات بنجاح",
        articles_successStories_ads: paginatedStories,
        error: undefined,
        pagination: {
            total: allStories.length,
            page,
            limit,
            totalPages: Math.ceil(allStories.length / limit),
        },
    };

    //FIXME: Simulate API delay (optional, can be removed in production)
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 2000);
    });

    // Real API implementation
    try {
        const response = await AqsaGuestAPI.get(`/landing/success-stories?page=${page}&limit=${limit}`);

        if (response.data && Array.isArray(response.data.stories)) {
            return {
                status: "200",
                message: response?.data?.message || "تم جلب البيانات بنجاح",
                articles_successStories_ads: response.data.stories as Article_SuccessStory_Ad[],
                error: undefined,
                pagination: response.data.pagination || {
                    total: response.data.stories.length,
                    page,
                    limit,
                    totalPages: Math.ceil(response.data.stories.length / limit),
                },
            };
        }

        return {
            status: "404",
            message: "لا توجد قصص نجاح متاحة",
            articles_successStories_ads: [],
            error: "لم يتم العثور على قصص نجاح",
            pagination: { total: 0, page, limit, totalPages: 0 },
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: "فشل في جلب البيانات",
            articles_successStories_ads: [],
            error: error.response?.data?.error || "حدث خطأ أثناء جلب قصص النجاح",
            pagination: { total: 0, page, limit, totalPages: 0 },
        };
    }
};