import { LOGO } from '@/assets/common';
import { BLOG_PAGE, HOME_PAGE, STORIES_PAGE } from '@/assets/common/manifest';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        // name: 'AL-AQSA Camp | إدارة مخيم الأقصى للنازحين',
        short_name: 'AL-AQSA Camp',
        description: 'منصة ويب لإدارة مخيم الأقصى للنازحين في غزة باستخدام تقنيات حديثة لتوزيع المساعدات، التعامل مع الشكاوى، وتحسين التواصل في الوقت الحقيقي.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3e704c', // Green from University of Palestine logo
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
        dir: 'rtl',
        lang: 'ar',
        orientation: 'landscape',
        categories: ['humanitarian', 'management', 'aid', 'disaster_response'],
        display_override: ['standalone', 'minimal-ui'],
        file_handlers: [],
        id: '/al-aqsa-camp',
        launch_handler: {
            client_mode: 'navigate-existing',
        },
        prefer_related_applications: false,
        protocol_handlers: [],
        related_applications: [],
        scope: '/',
        screenshots: [
            {
                src: HOME_PAGE.src,
                sizes: '1280x720',
                type: 'image/png',
            },
            {
                src: BLOG_PAGE.src,
                sizes: '1280x720',
                type: 'image/png',
            },
            {
                src: STORIES_PAGE.src,
                sizes: '1280x720',
                type: 'image/png',
            },
        ],
        // share_target: {
        //     action: '/share',
        //     method: 'POST',
        //     enctype: 'multipart/form-data',
        //     params: {
        //         title: 'title',
        //         text: 'text',
        //         url: 'url',
        //     },
        // },
        shortcuts: [
            {
                name: 'Home page',
                short_name: 'Home',
                description: 'describe AL-AQSA CAMP',
                url: '/',
                icons: [{ src: LOGO.src, sizes: 'any', type: 'image/png' }],
            },
        ],

    };
} 