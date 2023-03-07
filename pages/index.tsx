import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

// import { getPosts } from '../lib/hashnodeApi'
import { getAllPublishedPostsDesc } from '../lib/md'
import Posts from '../components/posts/Posts'
import { Post } from '../types/Post'
import MainLayout from '../layouts/MainLayout'
import ProfileHero from '../components/ProfileHero'

interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <MainLayout>
      <Head>
        <title>apu314</title>
        <meta
          name="description"
          content="Página personal de Adolfo Unturbe Pérez, desarrollador Javascript"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"
        />
      </Head>

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
