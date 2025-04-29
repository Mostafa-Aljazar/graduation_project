import successStoryResponse from "@/@types/landing/successStoryResponse.type";
import { STORIES } from "@/content/home";


// RETURN FAKE DATA
export const getSuccessStories = async (): Promise<successStoryResponse[]> => {
    return await STORIES;
}

