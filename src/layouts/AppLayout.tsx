import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import React, { ReactNode, useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useAuthContext } from "../utils/contexts/AuthContext"
import useConstants from "../utils/hooks/useConstants"

interface IAppLayout {
  children: ReactNode
  title: string
  needAuth?: boolean
}
const AppLayout: React.FC<IAppLayout> = ({ children, title, needAuth }) => {
  const constants = useConstants()
  const authContext = useAuthContext()
  const router = useRouter()
  const [isVisible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    if (needAuth) {
      ;(async () => {
        if (!authContext.isAuth()) {
          if (authContext.hasRefreshToken()) {
            await authContext.refresh()
            setVisible(true)
          } else {
            router.replace("/")
          }
        } else {
          setVisible(true)
        }
      })()
    } else {
      setVisible(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isVisible && (
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
          <Navbar />
          <main>{children}</main>
        </>
      )}
    </>
  )
}

export default AppLayout
