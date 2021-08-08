import React, { ReactNode } from "react"
import Head from "next/head"
import Navbar from "../components/Navbar"

interface IAppLayout {
  children: ReactNode
  title: string
}
const AppLayout: React.FC<IAppLayout> = ({ children, title }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Dashboard client application developed using Next.js and TypeScript"
        />
        <title>{title} | Dashboard</title>
        <link rel="shortcut icon" href="/images/dashboard.png" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default AppLayout
