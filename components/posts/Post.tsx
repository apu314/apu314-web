import { FC } from 'react'
import { Post as IPost } from '../../types/Post'
import Markdown from '../../components/markdown/Markdown'
import { formatToReadableDate } from '../../helpers/dateHelper'
import { useReadingTime } from 'react-hook-reading-time'

interface Props {
  post: IPost
}

const Post: FC<Props> = ({ post }) => {
  const { frontmatter, content } = post

  const { text: readingTime } = useReadingTime(content)

  return (
    <>
      <h2 className="post-title">{frontmatter.title}</h2>
      <div className="meta  grid grid-flow-col justify-start place-items-center gap-2">
        <span className="post-publishDate">
          {formatToReadableDate(frontmatter.publishedDate)}
        </span>
        {readingTime && (
          <>
            -<span className="post-readingTime">{readingTime}</span>
          </>
        )}
        {frontmatter.tags && Boolean(frontmatter.tags.length) && (
          <>
            -<span className="post-tags">{frontmatter.tags.join(', ')}</span>
          </>
        )}
      </div>

      <hr className="post-separator" />

      <div className="post-content">
        <Markdown content={content} />
      </div>
    </>
  )
}

export default Post
