import React, { ReactNode, useEffect, useState } from "react"
import Head from "next/head"
import useConstants from "../utils/useConstants"

interface IAppLayout {
  children: ReactNode
  title: string
  needAuth?: boolean
}

const AppLayout: React.FC<IAppLayout> = ({ children, title, needAuth }) => {
  const constants = useConstants()
  const [isShow, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (needAuth) {
      console.log("Check user is authenticated")
    } else {
      setShow(true)
    }
  }, [])

  return (
    <>
      {isShow && (
        <>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={constants.metadata.description} />
            <title>
              {title} | {constants.metadata.title}
            </title>
            <link rel="shortcut icon" href="/images/dashboard.png" />
          </Head>
          <main>{children}</main>
        </>
      )}
    </>
  )
}

export default AppLayout
