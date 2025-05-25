import { StaticImageData } from "next/image";

export interface Articles_SuccessStoriesResponse {
    status: string;
    message: string;
    articles_successStories: Article_SuccessStory[];
    error?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
export interface Article_SuccessStoryResponse {
    status: string
    message?: string
    article_successStory: Article_SuccessStory | null
    error?: string;
}

export interface Article_SuccessStory {
    id: number | string;
    title: string;
    content: string;
    brief?: string;
    img: string | StaticImageData;
    createdAt: string | Date;
    updatedAt?: string | Date;
}

