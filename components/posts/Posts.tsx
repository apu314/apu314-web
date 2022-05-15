import React, { FC } from 'react'
import { Post } from '../../pages';


interface Props {
  posts: Post[]
}

const Posts: FC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post: Post) => {
        return (
          <div key={post._id}>
            <h1>{post.title}</h1>
            <p>{post.brief}</p>
          </div>
        );
      })}
    </>
  )
}

export default Posts