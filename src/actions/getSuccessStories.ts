import successStoryResponse from "@/@types/successStoryResponse";
import { STORIES } from "@/content/blog"


// RETURN FAKE DATA
export const getSuccessStories = async (): Promise<successStoryResponse[]> => {
    return await STORIES;
}

