import { FC } from 'react'

type Props = {}

const Footer: FC<Props> = (props) => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <a
            href="https://github.com/apu314"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/adolfounturbe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/adolfo_unturbe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/apu314"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
