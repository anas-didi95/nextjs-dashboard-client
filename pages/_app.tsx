import "../styles/app.scss"
import type { AppProps } from "next/app"
import { NotificationProvider } from "../src/utils/contexts/NotificationContext"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  )
}

export default App
