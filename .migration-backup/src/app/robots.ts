import type { MetadataRoute } from 'next'
import { LANDING_ROUTES } from '@/constants/routes'
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type'
import { getAdsBlogsStories } from '@/actions/actors/manager/blog-stories-ads/getAdsBlogsStories'

// List of private/admin routes
const PRIVATE_ROUTES: string[] = []

export default async function robots(): Promise<MetadataRoute.Robots> {
    // Fetch dynamic content
    const blogResponse = await getAdsBlogsStories({ type: TYPE_WRITTEN_CONTENT.BLOG, page: 1, limit: 100 })
    const storyResponse = await getAdsBlogsStories({ type: TYPE_WRITTEN_CONTENT.SUCCESS_STORIES, page: 1, limit: 100 })

    const blogs = blogResponse.ads_blogs_stories || []
    const stories = storyResponse.ads_blogs_stories || []

    // Generate dynamic URLs
    const dynamicBlogRoutes = blogs.map(post => `${LANDING_ROUTES.BLOG}/${post.id}`)
    const dynamicStoryRoutes = stories.map(story => `${LANDING_ROUTES.SUCCESS_STORY}/${story.id}`)

    // Combine all public routes
    const publicRoutes = [
        LANDING_ROUTES.HOME,
        LANDING_ROUTES.BLOG,
        LANDING_ROUTES.SUCCESS_STORY,
        ...dynamicBlogRoutes,
        ...dynamicStoryRoutes,
    ]

    return {
        rules: [
            {
                userAgent: '*',
                allow: publicRoutes,
                disallow: PRIVATE_ROUTES,
            },
        ],
        sitemap: 'https://al-aqsa-camp.vercel.app/sitemap.xml',
    }
}
