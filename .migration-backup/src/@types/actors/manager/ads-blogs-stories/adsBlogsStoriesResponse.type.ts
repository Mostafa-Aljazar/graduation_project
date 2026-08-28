import { TYPE_WRITTEN_CONTENT } from "../../common-types/index.type";

export interface AdBlogStory {
    id: number;
    title: string;
    content: string;
    brief?: string;
    imgs: string[];
    created_at: string | Date;
    updated_at?: string | Date;
    type: TYPE_WRITTEN_CONTENT;
}

export interface AdBlogStoryResponse {
    status: number
    message?: string
    ad_blog_story: AdBlogStory
    error?: string;
}

export interface AdsBlogsStoriesResponse {
    status: number;
    message?: string;
    ads_blogs_stories: AdBlogStory[];
    error?: string;
    pagination: {
        page: number;
        limit: number;
        total_items: number;
        total_pages: number;
    };
}
