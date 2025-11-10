import type { PostFrontmatter, Post } from '../types/Post'
import matter from 'gray-matter'
import {
  getAllFilesFromFolder,
  getFileContent,
  getFilesNamesFromfolder,
  getFrontmatter,
  isPublished
} from '../helpers/markdown'

export const getAllPosts = (folder: string): PostFrontmatter[] => {
  const posts = getAllFilesFromFolder(folder) as PostFrontmatter[]

  return posts
}

export const getAllPublishedPosts = (folder: string) => {
  const posts = getAllPosts(folder)

  const published = posts.filter((post) => {
    return isPublished(post)
  })

  return published
}

export const getAllPublishedPostsFilenames = (folder: string): string[] => {
  const postsFilesNames = getFilesNamesFromfolder(folder)
  const publishedPostsFilesNames = postsFilesNames
    .map((filenameWithExtension) => filenameWithExtension.replace(/.md?$/, ''))
    .filter((postFilename) => {
      const source = getFileContent(postFilename, folder)
      const frontmatter = getFrontmatter(source)

      return isPublished(frontmatter)
    })

  return publishedPostsFilesNames
}

export const getSinglePost = (slug: string, folder: string): Post => {
  const source = getFileContent(slug, folder)
  const { data, content } = matter(source)
  const frontmatter = data as PostFrontmatter

  return {
    ...frontmatter,
    content
  }
}

// Older dates to the end of the array
export const getAllPublishedPostsAsc = (folder: string): PostFrontmatter[] => {
  const posts = getAllPublishedPosts(folder)

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.publishedDate).getTime()
    const dateB = new Date(b.publishedDate).getTime()

    return dateB - dateA
  })

  return sortedPosts
}
