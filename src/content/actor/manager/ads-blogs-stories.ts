import { BookOpenCheck, MicVocal, Newspaper } from "lucide-react";

export const GET_ADDS_BLOG_STORIES_TABS = {
    ADS: { label: 'الإعلانات', icon: MicVocal },
    BLOG: { label: 'المدونة', icon: Newspaper },
    SUCCESS_STORIES: { label: 'قصص النجاح', icon: BookOpenCheck },
} as const;

export const ADS_HEADER_TITLE = 'الإعلانات :';
export const BLOG_HEADER_TITLE = 'مدونتنا :';
export const SUCCESS_STORIES_HEADER_TITLE = 'قصص النجاح:';



export enum TYPE_CONTENT {
    BLOG = 'BLOG',
    SUCCESS_STORIES = 'SUCCESS_STORIES',
    ADS = 'ADS',
}