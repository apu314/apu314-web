import { FC } from 'react'
import { Post as IPost } from '../../types/Post'
import PostCard from './PostCard'

interface Props {
  posts: IPost[]
}

const Posts: FC<Props> = ({ posts }) => {
  return (
    <div className="grid grid-flow-row gap-3 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post: IPost) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

export default Posts
