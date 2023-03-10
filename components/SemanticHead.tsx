import Head from 'next/head'
import { FC } from 'react'

interface Props {
  title: string
  description: string
  keywords?: string[]
}

const SemanticHead: FC<Props> = (props) => {
  const { title, description, keywords } = props

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {keywords && <meta name="keywords" content={keywords?.join(', ')} />}

      {/* <link rel="icon" href="/favicon.ico" /> */}
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"
      />
    </Head>
  )
}

export default SemanticHead