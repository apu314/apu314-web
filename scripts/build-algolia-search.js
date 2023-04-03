require('dotenv').config()
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
)

const index = client.initIndex('BLOG_POSTS')

const saveObjectsToAlgolia = async () => {
  const posts = getAllPublishedPostsAsc('content/posts')
  console.log(posts)
  await index
    .saveObjects(posts, {
      autoGenerateObjectIDIfNotExist: true
    })
    .then(({ objectIDs }) => {
      console.log(objectIDs)
    })
    .catch(console.error)
}

saveObjectsToAlgolia()
