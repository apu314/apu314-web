import { config } from 'dotenv'
import { getAllPublishedPostsAsc } from '../lib/md'
import algoliasearch from 'algoliasearch'

config()
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.ALGOLIA_SEARCH_ADMIN_KEY || ''
)

const index = client.initIndex('BLOG_POSTS')

const saveObjectsToAlgolia = async () => {
  const posts = getAllPublishedPostsAsc('content/posts')
  await index
    .saveObjects(posts, {
      autoGenerateObjectIDIfNotExist: true
    })
    .then(({ objectIDs }) => {
      console.log(
        'Successfully imprted the following objectIDs into algolia --> ',
        objectIDs
      )
    })
    .catch(console.error)
}

saveObjectsToAlgolia()

export {}
