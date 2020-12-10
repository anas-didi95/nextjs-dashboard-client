import React, { ReactNode } from "react"
import Head from "next/head"
import useConstants from "../utils/useConstants"

interface IAppLayout {
  children: ReactNode
  title: string
}

const AppLayout: React.FC<IAppLayout> = ({ children, title }) => {
  const constants = useConstants()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={constants.metadata.description} />
        <title>
          {title} | {constants.metadata.title}
        </title>
        <link rel="shortcut icon" href="/images/dashboard.png" />
      </Head>
      <main>{children}</main>
    </>
  )
}

export default AppLayout
