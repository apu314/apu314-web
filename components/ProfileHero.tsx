import { FC } from 'react'
import Image from 'next/image'

import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

type Props = {}

const ProfileHero: FC<Props> = (props) => {
  return (
    <div className="profileHero flex mb-10 sm:flex-row flex-col">
      <div className="flex items-center justify-center sm:justify-start mr-5">
        <div className="profileImage--wrapper">
          <Image
            src="/images/profile-photo.webp"
            alt="profile photo"
            width={200}
            height={200}
            priority={true}
          />
        </div>
      </div>

      <div className="header-info  flex flex-col justify-center">
        <div className="header-copy">
          <h1 className="text-4xl font-normal mt-5">
            Hello 👋🏼 {`I'm `}
            <span className="link-underline">apu314</span>
          </h1>
          <h2 className="text-xl font-light mt-4">
            Sofware developer & passionate about JavasScript
          </h2>
        </div>

        <ul className="social-links  flex flex-row py-2">
          <li className="icon icon-github">
            <a
              href="https://github.com/apu314"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub
                size={22}
                // color={'#171515'}
              />
            </a>
          </li>
          <li className="icon icon-linkedin">
            <a
              href="https://www.linkedin.com/in/adolfounturbe/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin
                size={22}
                // color={'#0A66C2'}
              />
            </a>
          </li>
          <li className="icon icon-twitter">
            <a
              href="https://twitter.com/adolfo_unturbe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter
                size={22}
                // color={'#1A8CD8'}
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileHero
