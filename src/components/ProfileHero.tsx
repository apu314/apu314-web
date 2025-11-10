import { FC } from 'react'
import Image from 'next/image'

import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'
import Link from 'next/link'

const ProfileHero: FC = () => {
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
            Sofware developer & passionate about JavaScript
          </h2>
        </div>

        <ul className="list-none m-0 pl-0 social-links  flex flex-row py-2">
          <li className="icon icon-github">
            <Link
              href="https://github.com/apu314"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub
                size={22}
                // color={'#171515'}
              />
            </Link>
          </li>
          <li className="icon icon-linkedin">
            <Link
              href="https://www.linkedin.com/in/adolfounturbe/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin
                size={22}
                // color={'#0A66C2'}
              />
            </Link>
          </li>
          <li className="icon icon-twitter">
            <Link
              href="https://twitter.com/adolfo_unturbe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter
                size={22}
                // color={'#1A8CD8'}
              />
            </Link>
          </li>
          <li className="icon icon-instagram">
            <Link
              href="https://instagram.com/apu314"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram
                size={22}
                // color={'#1A8CD8'}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileHero
