'use server';

import {
    Article_SuccessStory_Ad,
    Article_SuccessStory_Ad_Response,
} from '@/@types/common/article-successStories-adsResponse.type';
import { FAKE_ARTICLES } from '@/content/landing/fake-data';
import { AqsaGuestAPI } from '@/services';

export interface getAdProps {
    ad_Id: number;
}

export const getAd = async ({
    ad_Id,
}: getAdProps): Promise<Article_SuccessStory_Ad_Response> => {
    const useFake = true;

    if (useFake) {
        const fakeAd = FAKE_ARTICLES.find((item) => item.id === ad_Id) || null;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: fakeAd ? '200' : '404',
                    message: fakeAd
                        ? 'تم جلب الإعلان بنجاح'
                        : 'لم يتم العثور على الإعلان',
                    article_successStory_ad: fakeAd,
                    error: fakeAd ? undefined : 'الإعلان غير موجود',
                });
            }, 1000);
        });
    }

    try {
        const response = await AqsaGuestAPI.get<Article_SuccessStory_Ad_Response>(
            `/landing/ads/${ad_Id}`
        );

        const ad = response.data.article_successStory_ad || null;

        return {
            status: response.status.toString(),
            message: response.data.message || 'تم جلب الإعلان بنجاح',
            article_successStory_ad: ad,
            error: ad ? undefined : 'الإعلان غير موجود',
        };
    } catch (error: any) {
        return {
            status: error.response?.status?.toString() || '500',
            message: 'فشل في جلب الإعلان',
            article_successStory_ad: null,
            error: error.response?.data?.error || 'حدث خطأ أثناء جلب الإعلان',
        };
    }
};
