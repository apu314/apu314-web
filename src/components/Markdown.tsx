'use client'

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

// Configure marked with custom renderer for code highlighting
marked.use({
  renderer: {
    code({ text, lang }) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          const highlighted = hljs.highlight(text, {
            language: lang,
            ignoreIllegals: true
          }).value
          return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`
        } catch (err) {
          console.error('Highlight error:', err)
        }
      }

      const autoHighlighted = hljs.highlightAuto(text).value
      return `<pre><code class="hljs">${autoHighlighted}</code></pre>`
    }
  }
})

const Markdown: FC<Props> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const html = marked.parse(content)
      containerRef.current.innerHTML = html as string
    }
  }, [content])

  return <div ref={containerRef} />
}

export default Markdown
