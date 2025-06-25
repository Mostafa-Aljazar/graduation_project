"use server";
import { AqsaAPI } from "@/services";
import { FAKE_ADS, } from "@/content/landing/fake-data";
import { Article_SuccessStory_Ad, Article_SuccessStory_Ad_Response } from "@/@types/common/article-successStories-adsResponse.type";



export type getAdProps = {
    id: number
}

export const getAd = async ({ id }: getAdProps): Promise<Article_SuccessStory_Ad_Response> => {
    if (!id || isNaN(id)) {
        return {
            status: "400",
            message: "رقم الاعلان غير صالح",
            article_successStory_ad: null,
            error: "يجب تقديم رقم اعلان صالح",
        };
    }


    //FIXME: Fake data implementation
    let article_successStory_ad: Article_SuccessStory_Ad | undefined = FAKE_ADS[0];

    if (article_successStory_ad) {
        return {
            status: "200",
            message: "تم جلب الاعلان بنجاح",
            article_successStory_ad,
            error: undefined,
        };
    }

    return {
        status: "404",
        message: "الاعلان غير موجود",
        article_successStory_ad: null,
        error: "لم يتم العثور على الاعلان المطلوب",
    };

    // Real API implementation
    try {
        const response = await AqsaAPI.get<Article_SuccessStory_Ad_Response>(`/landing/ads/${id}`);

        if (response.data && response.data.article_successStory_ad) {
            return {
                status: "200",
                message: response?.data?.message || "تم جلب الاعلان بنجاح",
                article_successStory_ad: response.data.article_successStory_ad as Article_SuccessStory_Ad,
                error: undefined,
            };
        }

        return {
            status: "404",
            message: "الاعلان غير موجود",
            article_successStory_ad: null,
            error: "لم يتم العثور على الاعلان المطلوب",
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: "فشل في جلب الاعلان",
            article_successStory_ad: null,
            error: error.response?.data?.error || "حدث خطأ أثناء جلب الاعلان",
        };
    }
};