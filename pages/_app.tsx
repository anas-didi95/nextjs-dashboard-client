import type { AppProps } from "next/app"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { AuthProvider } from "../src/utils/contexts/AuthContext"
import { LoadingProvider } from "../src/utils/contexts/LoadingContext"
import { NotificationProvider } from "../src/utils/contexts/NotificationContext"
import "../styles/app.scss"

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const routeChangeStartHandler = () => {
      setLoading(true)
    }
    const routeChangeCompleteHandler = () => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    router.events.on("routeChangeStart", routeChangeStartHandler)
    router.events.on("routeChangeComplete", routeChangeCompleteHandler)

    return () => {
      router.events.off("routeChangeStart", routeChangeStartHandler)
      router.events.off("routeChangeComplete", routeChangeCompleteHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthProvider>
      <NotificationProvider>
        <LoadingProvider>
          <div
            className={`pageloader has-background-info is-bottom-to-top ${
              isLoading ? "is-active" : ""
            }`}>
            <span className="title">Loading</span>
          </div>
          {!isLoading && <Component {...pageProps} />}
        </LoadingProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
