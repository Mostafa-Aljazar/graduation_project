"use server";
import { AqsaGuestAPI } from "@/services";
import { FAKE_STORIES } from "@/content/landing/fake-data";
import { Article_SuccessStory_Ad, Article_SuccessStory_Ad_Response } from "@/@types/common/article-successStories-adsResponse.type";


export const getStory = async (storyId: number): Promise<Article_SuccessStory_Ad_Response> => {
  if (!storyId || isNaN(storyId)) {
    return {
      status: "400",
      message: "رقم القصة غير صالح",
      article_successStory_ad: null,
      error: "يجب تقديم رقم قصة صالح",
    };
  }

  //FIXME:  Fake data implementation
  let article_successStory_ad: Article_SuccessStory_Ad | undefined = FAKE_STORIES[0];


  if (article_successStory_ad) {
    return {
      status: "200",
      message: "تم جلب القصة بنجاح",
      article_successStory_ad,
      error: undefined,
    };
  }

  return {
    status: "404",
    message: "القصة غير موجودة",
    article_successStory_ad: null,
    error: "لم يتم العثور على القصة المطلوبة",
  };

  // Real API implementation
  try {
    const response = await AqsaGuestAPI.get(`/landing/success-stories/${storyId}`);

    if (response.data && response.data.story) {
      return {
        status: "200",
        message: response?.data?.message || "تم جلب القصة بنجاح",
        article_successStory_ad: response.data.story as Article_SuccessStory_Ad,
        error: undefined,
      };
    }

    return {
      status: "404",
      message: "القصة غير موجودة",
      article_successStory_ad: null,
      error: "لم يتم العثور على القصة المطلوبة",
    };
  } catch (error: any) {
    return {
      status: error.response?.status?.toString() || "500",
      message: "فشل في جلب القصة",
      article_successStory_ad: null,
      error: error.response?.data?.error || "حدث خطأ أثناء جلب القصة",
    };
  }
};