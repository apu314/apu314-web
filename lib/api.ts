
import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject } from '@apollo/client'
import { Post } from "../pages";

const initApolloClient = (): ApolloClient<NormalizedCacheObject> => {

  const client = new ApolloClient({
    uri: 'https://api.hashnode.com/',
    cache: new InMemoryCache()
  })

  return client
}

export const getPosts = async (): Promise<Post[]> => {
  const client = initApolloClient()

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        user(username: "apu314") {
          publication {
            posts(page: 0) {
              _id
              brief
              title
            }
          }
        }
      }
    `
  })

  const posts = data.user.publication.posts

  return posts
}