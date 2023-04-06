import { FC, useEffect, useRef } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/github-dark-dimmed.css'
// import 'highlight.js/styles/obsidian.css'
// import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/a11y-dark.css'
import 'highlight.js/styles/atom-one-dark.css'

type Props = {
  content: string
}

const Markdown: FC<Props> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      marked.setOptions({
        highlight: (code, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, {
              language: lang,
              ignoreIllegals: true
            }).value
          } else {
            return hljs.highlightAuto(code).value
          }
        }
      })

      const html = marked(content)
      containerRef.current.innerHTML = html
    }
  }, [content])

  return <div ref={containerRef} />
}

export default Markdown
