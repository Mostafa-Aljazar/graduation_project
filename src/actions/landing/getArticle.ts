import articleResponse from "@/@types/landing/articleResponse.type";
import { ARTICLE_EXAMPLE } from "@/content/landing/blog";


// RETURN FAKE DATA
export const getArticle = async (article_Id: string): Promise<articleResponse> => {
    return await ARTICLE_EXAMPLE;
}

