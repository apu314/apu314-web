import type { Post } from '@/types/Post'

import { Metadata } from 'next'

import { ProfileHero } from '@/components'
import { Posts } from '@/components/posts'
import { getAllPublishedPostsAsc } from '@/lib/md'

const POSTS_FOLDER = 'content/posts'

export const metadata: Metadata = {
  title: 'apu314',
  description:
    'Página personal de Adolfo Unturbe Pérez, desarrollador Javascript',
  keywords: ['Adolfo Unturbe Pérez', 'apu314', 'JavaScript', 'Desarrollo web'],
  openGraph: {
    title: 'apu314',
    description:
      'Página personal de Adolfo Unturbe Pérez, desarrollador Javascript',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@adolfo_unturbe',
    creator: '@adolfo_unturbe',
    title: 'apu314',
    description:
      'Página personal de Adolfo Unturbe Pérez, desarrollador Javascript'
  },
  icons: {
    icon: '/favicon.ico'
  }
}

const getPosts = (): Post[] => {
  return getAllPublishedPostsAsc(POSTS_FOLDER) as Post[]
}

export default function Home() {
  const posts = getPosts()

  return (
    <>
      {/* <SemanticHead
        title='apu314'
        description='Página personal de Adolfo Unturbe Pérez, desarrollador Javascript'
      /> */}
      <main>
        <ProfileHero />

        {Boolean(posts.length) && (
          <div>
            <h2 className="text-xl font-medium mb-4">Últimos artículos</h2>
            <Posts posts={posts} />
          </div>
        )}
      </main>
    </>
  )
}
