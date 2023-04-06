import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Post as IPost } from '../../types/Post'

import Post from '../../components/posts/Post'
import { MainLayout } from '../../layouts'

import { getSinglePost, getAllPublishedPostsFilenames } from '../../lib/md'
import { SemanticHead } from '../../components'

const PostPage: NextPage<IPost> = (post) => {
  return (
    <MainLayout classNames="post-container">
      <SemanticHead
        title={post.title}
        description={post.description}
        keywords={post.tags}
      />
      <Post post={post} />
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = (ctx) => {
  const postsFileNames = getAllPublishedPostsFilenames('content/posts')

  const paths = postsFileNames.map((filename) => ({
    params: {
      slug: filename
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params as { slug: string }
  const post = getSinglePost(slug, 'content/posts')

  return {
    props: {
      ...post
    }
  }
}

export default PostPage
