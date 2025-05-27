"use server";
import { AqsaGuestAPI } from "@/services";
import { FAKE_ARTICLE } from "@/content/landing/fake-data";
import { Article_SuccessStory_Ad, Articles_SuccessStories_Ads_Response } from "@/@types/common/article-successStories-adsResponse.type";


export type getArticlesProps = {
    page?: number;
    limit?: number;
}
export const getArticles = async ({ page = 1, limit = 5 }: getArticlesProps): Promise<Articles_SuccessStories_Ads_Response> => {
    // Validate page and limit
    if (page < 1 || limit < 1 || isNaN(page) || isNaN(limit)) {
        return {
            status: "400",
            message: "معاملات التصفح غير صالحة",
            articles_successStories_ads: [],
            error: "يجب تقديم رقم صفحة وحد أقصى صالحين",
        };
    }

    //FIXME: Fake data implementation
    const totalArticles = 20; // Simulate 20 articles in "database"
    const start = (page - 1) * limit;
    const end = start + limit;

    // Generate varied fake articles if ARTICLE_EXAMPLE is a single object
    let allArticles: Article_SuccessStory_Ad[] = [];
    if (Array.isArray(FAKE_ARTICLE)) {
        allArticles = FAKE_ARTICLE;
    } else {
        allArticles = Array(totalArticles)
            .fill(null)
            .map((_, index) => ({
                ...FAKE_ARTICLE,
                id: index + 1,
                title: `${FAKE_ARTICLE.title} ${index + 1}`,
                createdAt: new Date(Date.now() - index * 86400000).toISOString(), // Vary dates
            }));
    }

    // Apply pagination
    const paginatedArticles = allArticles.slice(start, end);

    const fakeData: Articles_SuccessStories_Ads_Response = {
        status: "200",
        message: "تم جلب المقالات بنجاح",
        articles_successStories_ads: paginatedArticles,
        error: undefined,
        pagination: {
            total: allArticles.length,
            page,
            limit,
            totalPages: Math.ceil(allArticles.length / limit),
        },
    };
    //FIXME: Simulate API delay (optional, can be removed in production)
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(fakeData);
        }, 1000);
    });



    // Real API implementation
    try {
        const response = await AqsaGuestAPI.get<Articles_SuccessStories_Ads_Response>(`/landing/articles?page=${page}&limit=${limit}`);

        if (response.data && Array.isArray(response.data.articles_successStories_ads)) {
            return {
                status: "200",
                message: response?.data?.message || "تم جلب المقالات بنجاح",
                articles_successStories_ads: response.data.articles_successStories_ads as Article_SuccessStory_Ad[],
                error: undefined,
                pagination: response.data.pagination || {
                    total: response.data.articles_successStories_ads.length,
                    page,
                    limit,
                    totalPages: Math.ceil(response.data.articles_successStories_ads.length / limit),
                },
            };
        }

        return {
            status: "404",
            message: "لا توجد مقالات متاحة",
            articles_successStories_ads: [],
            error: "لم يتم العثور على مقالات",
            pagination: { total: 0, page, limit, totalPages: 0 },
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: "فشل في جلب المقالات",
            articles_successStories_ads: [],
            error: error.response?.data?.error || "حدث خطأ أثناء جلب المقالات",
            pagination: { total: 0, page, limit, totalPages: 0 },
        };
    }
};