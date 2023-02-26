import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Post } from '../../types/Post'

import { getSinglePost, getAllPublishedPosts } from '../../lib/md'
import { formatToReadableDate } from '../../helpers/dateHelper'

import Markdown from '../../components/markdown/Markdown'

const PostPage: NextPage<Post> = ({ content, frontmatter }) => {
  return (
    <div className="post-container">
      <h2 className="post-title">{frontmatter.title}</h2>
      <div className="meta  grid grid-flow-col justify-start place-items-center gap-2">
        <span className="post-publishDate">
          {formatToReadableDate(frontmatter.publishedDate)}
          {frontmatter.tags && Boolean(frontmatter.tags.length) && (
            <div className="post-tags">{frontmatter.tags.join(', ')}</div>
          )}
        </span>
      </div>

      <hr className="post-separator" />

      <div className="post-content">
        <Markdown content={content} />
      </div>
    </div>
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
