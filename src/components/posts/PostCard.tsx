import type { PostFrontmatter } from '../../types/Post'

import { FC } from 'react'
import Link from 'next/link'

import { formatToReadableDate } from '../../helpers/dateHelper'

interface Props {
  post: PostFrontmatter
}

const PostCard: FC<Props> = ({ post }) => {
  const getDateTime = () => {
    return new Date(post.publishedDate).toISOString()
  }

  return (
    <>
      <Link href={`/posts/${post.slug}`} className="card">
        {/* <a className={`${styles.postCard}  rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300`}> */}
        <h1 className="card-title">{post.title}</h1>
        <div className="card-meta">
          <time dateTime={getDateTime()}>
            {formatToReadableDate(post.publishedDate)}
          </time>
        </div>
      </Link>
    </>
  )
}

export default PostCard
