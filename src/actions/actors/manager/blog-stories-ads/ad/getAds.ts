"use server";
import { AqsaGuestAPI } from "@/services";
import { FAKE_ADS } from "@/content/landing/fake-data";
import { Article_SuccessStory_Ad, Articles_SuccessStories_Ads_Response } from "@/@types/common/article-successStories-adsResponse.type";


export type getAdsProps = {
    page?: number;
    limit?: number;
}
export const getAds = async ({ page = 1, limit = 5 }: getAdsProps): Promise<Articles_SuccessStories_Ads_Response> => {
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
    const totalArticles = 20; // Simulate 20 ads in "database"
    const start = (page - 1) * limit;
    const end = start + limit;

    let allAds: Article_SuccessStory_Ad[] = FAKE_ADS;


    // Apply pagination
    const paginatedArticles = allAds.slice(start, end);

    const fakeData: Articles_SuccessStories_Ads_Response = {
        status: "200",
        message: "تم جلب الاعلانات بنجاح",
        articles_successStories_ads: paginatedArticles,
        error: undefined,
        pagination: {
            total: allAds.length,
            page,
            limit,
            totalPages: Math.ceil(allAds.length / limit),
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
        const response = await AqsaGuestAPI.get<Articles_SuccessStories_Ads_Response>(`/landing / articles ? page = ${page}& limit=${limit} `);

        if (response.data && Array.isArray(response.data.articles_successStories_ads)) {
            return {
                status: "200",
                message: response?.data?.message || "تم جلب الاعلانات بنجاح",
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
            message: "لا توجد الاعلانات متاحة",
            articles_successStories_ads: [],
            error: "لم يتم العثور على الاعلانات",
            pagination: { total: 0, page, limit, totalPages: 0 },
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: "فشل في جلب الاعلانات",
            articles_successStories_ads: [],
            error: error.response?.data?.error || "حدث خطأ أثناء جلب الاعلانات",
            pagination: { total: 0, page, limit, totalPages: 0 },
        };
    }
};