import React, { FC } from 'react'
import { Post as IPost } from '../../types/Post'
import Link from 'next/link'
import dateFormat, { i18n } from 'dateformat'

import styles from './PostCard.module.scss'

i18n.monthNames = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

interface Props {
  post: IPost
}

const PostCard: FC<Props> = ({ post }) => {
  const getDateTime = () => {
    return new Date(post.frontmatter.publishedDate).toISOString()
  }

  const formatToReadableDate = () => {
    const date = new Date(post.frontmatter.publishedDate)
    return dateFormat(date, 'd mmmm yyyy')
  }

  return (
    <>
      <Link href={`posts/${post.slug}`}>
        {/* <a className={`${styles.postCard}  rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300`}> */}
        <a
          className={`${styles.postCard}  rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300`}
        >
          <h1 className={`${styles.postTitle}`}>{post.frontmatter.title}</h1>
          <div className={styles.meta}>
            <time dateTime={getDateTime()}>{formatToReadableDate()}</time>
          </div>
        </a>
      </Link>
    </>
  )
}

export default PostCard
