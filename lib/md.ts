import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getPath = (folder: string) => {
  console.log('folder', folder)
  console.log(path.join(process.cwd(), `/${folder}`))
  return path.join(process.cwd(), `/${folder}`)
}

export const getFileContent = (filename: string, folder: string) => {
  const postsPath = getPath(folder)
  return fs.readFileSync(path.join(postsPath, filename), 'utf8')
}

export const getAllPosts = (folder: string) => {
  const postsPath = getPath(folder)
  console.log('[getAllPublishedPosts - md.ts] - postsPath ', postsPath)

  return fs
    .readdirSync(postsPath)
    .filter((path) => /.md?$/.test(path))
    .map((fileName) => {
      const source = getFileContent(fileName, folder)
      const slug = fileName.replace(/.md?$/, '')
      const { data } = matter(source)

      return {
        frontmatter: data,
        slug
      }
    })
}

export const getAllPublishedPosts = (folder: string) => {
  const posts = getAllPosts(folder)
  console.log('[getAllPublishedPosts - md.ts] - posts ', posts)

  const published = posts.filter((post) => {
    return post.frontmatter.isPublished === true
  })

  return published
}

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder)
  const { data: frontmatter, content } = matter(source)

  return {
    frontmatter,
    content
  }
}
