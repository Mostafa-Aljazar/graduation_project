import articleResponse from "@/@types/articleResponse.type";
import { ARTICLE_EXAMPLE } from "@/content/blog";


// RETURN FAKE DATA
export const getArticle = async (article_Id: string): Promise<articleResponse> => {
    return await ARTICLE_EXAMPLE;
}

