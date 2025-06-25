import { StaticImageData } from "next/image";

export interface Articles_SuccessStories_Ads_Response {
    status: string;
    message: string;
    articles_successStories_ads: Article_SuccessStory_Ad[];
    error?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface Article_SuccessStory_Ad_Response {
    status: string
    message?: string
    article_successStory_ad: Article_SuccessStory_Ad | null
    error?: string;
}

export interface Article_SuccessStory_Ad {
    id: number;
    title: string;
    content: string;
    brief?: string;
    imgs: (string | StaticImageData)[];
    createdAt: string | Date;
    updatedAt?: string | Date;
}

