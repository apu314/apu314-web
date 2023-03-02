import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Post as IPost } from '../../types/Post'

import Post from '../../components/posts/Post'
import { MainLayout } from '../../layouts'

import { getSinglePost, getAllPublishedPosts } from '../../lib/md'

const PostPage: NextPage<IPost> = (post) => {
  return (
    <MainLayout>
      <div className="post-container">
        <Post post={post} />
      </div>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const paths = await getAllPublishedPosts('content/posts').map(({ slug }) => ({
    params: {
      slug
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const post = await getSinglePost(slug, 'content/posts')

  return {
    props: {
      ...post
    }
  }
}

export default PostPage
