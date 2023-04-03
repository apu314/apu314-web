require('dotenv').config()
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
)
console.log(
  'NEXT_PUBLIC_ALGOLIA_APP_ID --> ',
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
)
console.log(
  'ALGOLIA_SEARCH_ADMIN_KEY --> ',
  process.env.ALGOLIA_SEARCH_ADMIN_KEY
)

const index = client.initIndex('BLOG_POSTS')(
  // console.log('index -->', index)

  async function () {
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
)()
