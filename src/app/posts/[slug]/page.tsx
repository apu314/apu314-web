import type { Metadata } from 'next'

import Post from '@/components/posts/Post'

import { getSinglePost, getAllPublishedPostsFilenames } from '@/lib/md'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const postsFileNames = getAllPublishedPostsFilenames('content/posts')

  return postsFileNames.map((filename) => ({
    slug: filename
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getSinglePost(slug, 'content/posts')

  const jsonLD = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedDate,
    keywords: post.tags ? post.tags.join(', ') : '',
    articleBody: post.content,
    // image: '' // TODO: implement image in jsonLD
    author: {
      '@type': 'Person',
      name: 'Adolfo Unturbe Pérez',
      brand: 'apu314',
      url: 'https://apu314.com'
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    other: {
      'application-ld+json': JSON.stringify(jsonLD)
    }
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getSinglePost(slug, 'content/posts')

  return (
    <>
      <div className="post-container">
        <Post post={post} />
      </div>
    </>
  )
}
