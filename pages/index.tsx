import type { NextPage, GetStaticProps } from 'next'
import type { Post } from '../types/Post'

// import { getPosts } from '../lib/hashnodeApi'
import MainLayout from '../layouts/MainLayout'
import Posts from '../components/posts/Posts'
import ProfileHero from '../components/ProfileHero'
import SemanticHead from '../components/SemanticHead'

import { getAllPublishedPostsDesc } from '../lib/md'

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
        <main className="container  min-h-full w-full">
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
  const posts = await getAllPublishedPostsDesc('content/posts')

  return {
    props: {
      posts
    }
  }
}

export default Home
