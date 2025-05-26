"use server";
import AqsaAPI from "@/services";
import { FAKE_STORIES } from "@/content/landing/fake-data";
import { Article_SuccessStory, Article_SuccessStoryResponse } from "@/@types/landing/article-successStoriesResponse.type";


export const getStory = async (storyId: string): Promise<Article_SuccessStoryResponse> => {
  if (!storyId || isNaN(parseInt(storyId))) {
    return {
      status: "400",
      message: "رقم القصة غير صالح",
      article_successStory: null,
      error: "يجب تقديم رقم قصة صالح",
    };
  }

  //FIXME:  Fake data implementation
  let article_successStory: Article_SuccessStory | undefined = FAKE_STORIES[0];


  if (article_successStory) {
    return {
      status: "200",
      message: "تم جلب القصة بنجاح",
      article_successStory,
      error: undefined,
    };
  }

  return {
    status: "404",
    message: "القصة غير موجودة",
    article_successStory: null,
    error: "لم يتم العثور على القصة المطلوبة",
  };

  // Real API implementation
  try {
    const response = await AqsaAPI.get(`/landing/success-stories/${storyId}`);

    if (response.data && response.data.story) {
      return {
        status: "200",
        message: response?.data?.message || "تم جلب القصة بنجاح",
        article_successStory: response.data.story as Article_SuccessStory,
        error: undefined,
      };
    }

    return {
      status: "404",
      message: "القصة غير موجودة",
      article_successStory: null,
      error: "لم يتم العثور على القصة المطلوبة",
    };
  } catch (error: any) {
    return {
      status: error.response?.status?.toString() || "500",
      message: "فشل في جلب القصة",
      article_successStory: null,
      error: error.response?.data?.error || "حدث خطأ أثناء جلب القصة",
    };
  }
};