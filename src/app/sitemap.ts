import { MetadataRoute } from 'next'
import { getAllPublishedPosts } from '@/lib/md'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://apu314.com'

  // Get all published posts
  const posts = getAllPublishedPosts('content/posts')

  // Generate post entries
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.modifiedDate
      ? new Date(post.modifiedDate)
      : new Date(post.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.8
  }))

  // Homepage entry
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    }
  ]

  return [...routes, ...postEntries]
}
