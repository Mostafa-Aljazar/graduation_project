'use client';
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import { BLOG_PAGE } from '@/assets/common/manifest';
import Article_Story from '@/components/landing/common/article-story/article-story';
import { LANDING_ROUTES } from '@/constants/routes';
import { Stack } from '@mantine/core';
import { Metadata } from 'next';
import { use } from 'react';

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const articleId = params.id;
  const res = await getAdBlogStory({
    id: parseInt(articleId),
    type: TYPE_WRITTEN_CONTENT.BLOG,
  });
  const article = res.ad_blog_story;
  if (!article) return {};

  return {
    title: article.title,
    description: article.brief,
    openGraph: {
      title: article.title,
      description: article.brief,
      type: 'article',
      url: `https://al-aqsa-camp.vercel.app${LANDING_ROUTES.BLOG}/${article.id}`,
      images: [
        {
          url: article.imgs?.[0] || BLOG_PAGE.src,
          width: 1280,
          height: 720,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.brief,
      images: [article.imgs?.[0] || BLOG_PAGE.src],
    },
  };
}

export default function Article_Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Stack pt={60} className='w-full' mih={'100vh'}>
      <Article_Story written_content_Id={parseInt(id)} destination={TYPE_WRITTEN_CONTENT.BLOG} />
    </Stack>
  );
}
