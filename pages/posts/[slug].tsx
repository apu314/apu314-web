import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Post } from '../../types/Post'

import { getSinglePost, getAllPublishedPosts } from '../../lib/md'
import Markdown from '../../components/markdown/Markdown'

import styles from '../../styles/Post.module.css'
import { formatToReadableDate } from '../../helpers/dateHelper'

const PostPage: NextPage<Post> = ({ content, frontmatter }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{frontmatter.title}</h2>
      <div className="meta  grid grid-flow-col justify-start place-items-center gap-2">
        <span className={styles.publishDate}>
          {formatToReadableDate(frontmatter.publishedDate)}
          {frontmatter.tags && Boolean(frontmatter.tags.length) && (
            <div className={styles.tags}>{frontmatter.tags.join(', ')}</div>
          )}
        </span>
      </div>

      <hr className={`${styles.separator}`} />

      <div className={styles.content}>
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
