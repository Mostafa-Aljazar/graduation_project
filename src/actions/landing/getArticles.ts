import articleResponse from "@/@types/articleResponse.type";
import { ARTICLE_EXAMPLE } from "@/content/blog";

// RETURN FAKE DATA - Multiple Articles with pagination
export const getArticles = async (page: number = 1, limit: number = 5): Promise<articleResponse[]> => {
    // Simulate pagination by slicing the array
    const start = (page - 1) * limit;
    const end = start + limit;

    // Create array of 20 fake articles to simulate database
    const allArticles = Array(20).fill(ARTICLE_EXAMPLE);

    // Return sliced array based on page and limit
    return await allArticles.slice(start, end);
}

