"use server";
import { AqsaAPI } from "@/services";
import { FAKE_ARTICLES } from "@/content/landing/fake-data";
import { Article_SuccessStory_Ad, Article_SuccessStory_Ad_Response } from "@/@types/common/article-successStories-adsResponse.type";


export type getArticleProps = {
    id: number
}

export const getArticle = async ({ id }: getArticleProps): Promise<Article_SuccessStory_Ad_Response> => {
    // Validate articleId
    if (!id || isNaN(id)) {
        return {
            status: "400",
            message: "رقم المقال غير صالح",
            article_successStory_ad: null,
            error: "يجب تقديم رقم مقال صالح",
        };
    }


    //FIXME: Fake data implementation
    let article_successStory_ad: Article_SuccessStory_Ad | undefined = FAKE_ARTICLES[0];

    if (article_successStory_ad) {
        return {
            status: "200",
            message: "تم جلب المقال بنجاح",
            article_successStory_ad,
            error: undefined,
        };
    }

    return {
        status: "404",
        message: "المقال غير موجود",
        article_successStory_ad: null,
        error: "لم يتم العثور على المقال المطلوب",
    };

    // Real API implementation
    try {
        const response = await AqsaAPI.get<Article_SuccessStory_Ad_Response>(`/landing/articles/${id}`);

        if (response.data && response.data.article_successStory_ad) {
            return {
                status: "200",
                message: response?.data?.message || "تم جلب المقال بنجاح",
                article_successStory_ad: response.data.article_successStory_ad as Article_SuccessStory_Ad,
                error: undefined,
            };
        }

        return {
            status: "404",
            message: "المقال غير موجود",
            article_successStory_ad: null,
            error: "لم يتم العثور على المقال المطلوب",
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: "فشل في جلب المقال",
            article_successStory_ad: null,
            error: error.response?.data?.error || "حدث خطأ أثناء جلب المقال",
        };
    }
};