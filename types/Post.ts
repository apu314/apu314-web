export interface PostFrontmatter {
  title: string
  description: string
  isPublished: boolean
  publishedDate: string
  modifiedDate: string
  slug: string
  tags: string[]
  type: string
}
export interface Post extends PostFrontmatter {
  content: string
}

// export interface Frontmatter {
//   title: string
//   description: string
//   isPublished: boolean
//   publishedDate: string
//   slug: string
//   tags?: string[]
// }
// export interface Post {
//   frontmatter: Frontmatter
//   slug?: string
//   content: string
// }
