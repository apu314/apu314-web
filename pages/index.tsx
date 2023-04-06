import type { GetStaticProps, NextPage } from 'next'
import type { Post } from '../types/Post'

import { ProfileHero } from '../components'
import { SemanticHead } from '../components'
import { Posts } from '../components/posts'
import { MainLayout } from '../layouts/MainLayout'
import { getAllPublishedPostsAsc } from '../lib/md'

interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <SemanticHead
        title="apu314"
        description="Página personal de Adolfo Unturbe Pérez, desarrollador Javascript"
      />
      <MainLayout>
        <main>
          <ProfileHero />

          {Boolean(posts.length) && (
            <div>
              <h2 className="text-xl font-medium mb-4">Últimos artículos</h2>
              <Posts posts={posts} />
            </div>
          )}
        </main>
      </MainLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = getAllPublishedPostsAsc('content/posts')

  return {
    props: {
      posts
    }
  }
}

export default Home
