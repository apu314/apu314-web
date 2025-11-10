import type { PostFrontmatter } from '../types/Post'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`)
}

export const getFilesNamesFromfolder = (folder: string) => {
  const postsPath = getPath(folder)

  const filesNames = fs
    .readdirSync(postsPath)
    .filter((path) => /.md?$/.test(path))

  return filesNames
}

export const getFileContent = (filename: string, folder: string) => {
  const filePath = getPath(folder)

  let filenameWithExtension = filename
  if (!filename.includes('.md')) {
    filenameWithExtension += '.md'
  }

  const fileContent = fs.readFileSync(
    path.join(filePath, filenameWithExtension),
    'utf8'
  )

  return fileContent
}

export const getSlugFromFilename = (filename: string) => {
  return filename.replace(/.md?$/, '')
}

export const getFrontmatter = (source: string): PostFrontmatter => {
  const { data } = matter(source)
  const frontmatter = data as PostFrontmatter

  return frontmatter
}

export const getAllFilesFromFolder = (folder: string) => {
  const postsPath = getPath(folder)

  const filesContentList = fs
    .readdirSync(postsPath)
    .filter((path) => /.md?$/.test(path))
    .map((filename) => {
      const source = getFileContent(filename, folder)
      const frontmatter = getFrontmatter(source)

      if (frontmatter.slug) return frontmatter

      const slug = getSlugFromFilename(filename)

      return {
        ...frontmatter,
        slug
      }
    })

  return filesContentList
}

export const isPublished = (frontmatter: PostFrontmatter) => {
  if (!frontmatter.publishedDate) return false

  const publishedDate = new Date(frontmatter.publishedDate).getTime()
  const now = new Date().getTime()

  if (publishedDate > now) return false

  return frontmatter.isPublished ? true : false
}
