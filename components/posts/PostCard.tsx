import type { Post as IPost } from '../../types/Post'

import { FC } from 'react'
import Link from 'next/link'

import { formatToReadableDate } from '../../helpers/dateHelper'

interface Props {
  post: IPost
}

const PostCard: FC<Props> = ({ post }) => {
  const getDateTime = () => {
    return new Date(post.frontmatter.publishedDate).toISOString()
  }

  return (
    <>
      <Link
        href={`/posts/${post.slug}`}
        className="card  rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300"
      >
        {/* <a className={`${styles.postCard}  rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300`}> */}
        <h1 className="card-title dark:text-slate-300">
          {post.frontmatter.title}
        </h1>
        <div className="card-meta">
          <time dateTime={getDateTime()}>
            {formatToReadableDate(post.frontmatter.publishedDate)}
          </time>
        </div>
      </Link>
    </>
  )
}

export default PostCard
