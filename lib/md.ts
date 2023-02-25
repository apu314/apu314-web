import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '../types/Post'

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`)
}

export const getFileContent = (filename: string, folder: string) => {
  const postsPath = getPath(folder)
  return fs.readFileSync(path.join(postsPath, filename), 'utf8')
}

export const getAllPosts = (folder: string) => {
  const postsPath = getPath(folder)

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

//? Older dates to the end of the array
export const getAllPublishedPostsDesc = (folder: string): any[] => {
  const posts = getAllPublishedPosts(folder)

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedDate)
    const dateB = new Date(b.frontmatter.publishedDate)

    if (dateB < dateA) return 1
    if (dateB > dateA) return -1
    return 0
  })

  return sortedPosts
}
