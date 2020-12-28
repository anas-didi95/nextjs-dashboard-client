import React, { ReactNode, useEffect, useState } from "react"
import Head from "next/head"
import useConstants from "../utils/hooks/useConstants"
import { useRouter } from "next/router"
import Navbar from "../components/Navbar"
import { useAuthContext } from "../utils/contexts/AuthContext"
import { useNotificationContext } from "../utils/contexts/NotificationContext"

interface IAppLayout {
  children: ReactNode
  title: string
  needAuth?: boolean
}

const AppLayout: React.FC<IAppLayout> = ({ children, title, needAuth }) => {
  const constants = useConstants()
  const [isShow, setShow] = useState<boolean>(false)
  const auth = useAuthContext()
  const router = useRouter()
  const notificationContext = useNotificationContext()

  useEffect(() => {
    if (needAuth) {
      if (auth.isAuth()) {
        setShow(true)
      } else {
        router.replace("/")
      }
    } else {
      setShow(true)
    }
  }, [])

  useEffect(() => {
    notificationContext.checkSaveMessage()

    return () => {
      notificationContext.clear()
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
          <Navbar />
          <main>{children}</main>
        </>
      )}
    </>
  )
}

export default AppLayout
