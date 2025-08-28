import type { MetadataRoute } from 'next'
import { LANDING_ROUTES } from '@/constants/routes'
import { TYPE_WRITTEN_CONTENT } from '@/@types/actors/common-types/index.type'
import { getAdsBlogsStories } from '@/actions/actors/manager/blog-stories-ads/getAdsBlogsStories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch blogs
    const blogResponse = await getAdsBlogsStories({ type: TYPE_WRITTEN_CONTENT.BLOG, page: 1, limit: 100 })
    const blogs = blogResponse.ads_blogs_stories || []

    // Fetch success stories
    const storiesResponse = await getAdsBlogsStories({ type: TYPE_WRITTEN_CONTENT.SUCCESS_STORIES, page: 1, limit: 100 })
    const stories = storiesResponse.ads_blogs_stories || []

    const staticPages = [
        { url: LANDING_ROUTES.HOME, lastModified: new Date() },
        { url: LANDING_ROUTES.BLOG, lastModified: new Date() },
        { url: LANDING_ROUTES.SUCCESS_STORY, lastModified: new Date() },
    ]

    const dynamicBlog = blogs.map(post => ({
        url: `${LANDING_ROUTES.BLOG}/${post.id}`,
        lastModified: new Date(post.updated_at ?? Date.now()),
    }))

    const dynamicStories = stories.map(story => ({
        url: `${LANDING_ROUTES.SUCCESS_STORY}/${story.id}`,
        lastModified: new Date(story.updated_at ?? Date.now()),
    }))

    return [...staticPages, ...dynamicBlog, ...dynamicStories]
}
