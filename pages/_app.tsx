import "../styles/app.scss"
import { AuthProvider } from "../src/utils/contexts/AuthContext"
import { NotificationProvider } from "../src/utils/contexts/NotificationContext"
import { LoadingProvider } from "../src/utils/contexts/LoadingContext"
import type { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => (
  <NotificationProvider>
    <AuthProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </AuthProvider>
  </NotificationProvider>
)

export default App
