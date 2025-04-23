import successStory from "@/@types/successStories";
import { STORIES } from "@/content/blog"


// RETURN FAKE DATA
export const getSuccessStories = async (): Promise<successStory[]> => {
    return await STORIES;
}

