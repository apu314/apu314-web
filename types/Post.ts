export interface Frontmatter {
  title: string
  description: string
  isPublished: boolean
  publishedDate: string
  tags: [string]
}
export interface Post {
  // _id: any
  // title: string
  // brief: any
  frontmatter: {
    title: string
    description: string
    isPublished: boolean
    publishedDate: string
    tags: [string]
  }
  slug: string
  content: string
}
