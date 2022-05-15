import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

// import styles from '../styles/Home.module.css'

// import { getPosts } from '../lib/api'
// import { Posts } from '../components/posts'

import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

export interface Post {
  _id: any
  title: string
  brief: any
}

interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }) => {


  return (
    <>
      <Head>
        <title>apu314</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>" />
      </Head>

      <main
        // className={styles.main}
        className="container min-h-full w-full"
      >
        {/* <Posts posts={posts} /> */}
        <div
          className='flex flex-col'
        >
          <div
            className='flex justify-center sm:justify-start'
          >
            <Image
              src="/images/profile-photo.webp"
              objectFit="cover"
              alt="profile photo"
              width={200}
              height={200}
              // layout="fill"
              className="rounded-full m-1 hover:shadow-sm transition-shadow duration-200"
            />
          </div>
          <h1
            className="text-4xl font-normal mt-5"
          >
            Hello 👋🏼 {`I'm `}
            <span
              className='link-underline'
            >apu314</span>
          </h1>
          <h2
            className="text-xl font-light mt-4"
          >
            Sofware developer & passionate about JS world
          </h2>
        </div>
        
        <ul className='flex flex-row py-2'>
          <li className='p-2 cursor-pointer rounded-md hover:shadow-md icon-github'>
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
          <li className='p-2 cursor-pointer rounded-md hover:shadow-md icon-linkedin'>
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
          <li className='p-2 cursor-pointer rounded-md hover:shadow-md icon-twitter'>
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
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // const posts = await getPosts()

  return {
    props: {
      // posts: posts
    }
  }
}

export default Home
