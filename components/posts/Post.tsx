import { FC } from 'react'
import { Post as IPost } from '../../types/Post'
import Markdown from '../../components/markdown/Markdown'
import { formatToReadableDate } from '../../helpers/dateHelper'
import { useReadingTime } from 'react-hook-reading-time'

interface Props {
  post: IPost
}

const Post: FC<Props> = ({ post }) => {
  const { title, publishedDate, tags, content } = post

  const { minutes: readingTime } = useReadingTime(content)

  return (
    <article className="article">
      <h2 className="post-title">{title}</h2>
      <div className="meta  grid grid-flow-col justify-start place-items-center gap-2">
        <span className="post-publishDate">
          {formatToReadableDate(publishedDate)}
        </span>
        {readingTime && (
          <>
            -
            <span className="post-readingTime">{`${readingTime} minutos de lectura`}</span>
          </>
        )}
        {/* Componente: contribuye a este artículo */}
        {tags && tags.length && (
          <>
            -<span className="post-tags">{tags.join(', ')}</span>
          </>
        )}
      </div>

      <hr className="post-separator" />

      <div className="post-content">
        <Markdown content={content} />
      </div>
    </article>
  )
}

export default Post
