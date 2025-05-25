"use server";
import AqsaAPI from "@/services";
import { FAKE_ARTICLE } from "@/content/landing/fake-data";
import { Article_SuccessStory, Article_SuccessStoryResponse } from "@/@types/landing/article-successStoriesResponse.type";


export const getArticle = async (articleId: string): Promise<Article_SuccessStoryResponse> => {
    // Validate articleId
    if (!articleId || isNaN(parseInt(articleId))) {
        return {
            status: "400",
            message: "رقم المقال غير صالح",
            article_successStory: null,
            error: "يجب تقديم رقم مقال صالح",
        };
    }


    //FIXME: Fake data implementation
    let article_successStory: Article_SuccessStory | undefined = FAKE_ARTICLE;

    if (article_successStory) {
        return {
            status: "200",
            message: "تم جلب المقال بنجاح",
            article_successStory,
            error: undefined,
        };
    }

    return {
        status: "404",
        message: "المقال غير موجود",
        article_successStory: null,
        error: "لم يتم العثور على المقال المطلوب",
    };

    // Real API implementation
    try {
        const response = await AqsaAPI.get(`/landing/articles/${articleId}`);

        if (response.data && response.data.article) {
            return {
                status: "200",
                message: response?.data?.message || "تم جلب المقال بنجاح",
                article_successStory: response.data.article as Article_SuccessStory,
                error: undefined,
            };
        }

        return {
            status: "404",
            message: "المقال غير موجود",
            article_successStory: null,
            error: "لم يتم العثور على المقال المطلوب",
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || "500",
            message: "فشل في جلب المقال",
            article_successStory: null,
            error: error.response?.data?.error || "حدث خطأ أثناء جلب المقال",
        };
    }
};