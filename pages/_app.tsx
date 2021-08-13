import "../styles/app.scss"
import type { AppProps } from "next/app"
import { NotificationProvider } from "../src/utils/contexts/NotificationContext"
import { LoadingProvider } from "../src/utils/contexts/LoadingContext"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </NotificationProvider>
  )
}

export default App
