import type { AppProps } from "next/app"
import { AuthProvider } from "../src/utils/contexts/AuthContext"
import { LoadingProvider } from "../src/utils/contexts/LoadingContext"
import { NotificationProvider } from "../src/utils/contexts/NotificationContext"
import "../styles/app.scss"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <LoadingProvider>
          <Component {...pageProps} />
        </LoadingProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
