import "../styles/app.scss"
import { AuthProvider } from "../src/utils/contexts/AuthContext"
import { NotificationProvider } from "../src/utils/contexts/NotificationContext"
import { LoadingProvider } from "../src/utils/contexts/LoadingContext"

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <NotificationProvider>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </NotificationProvider>
  </AuthProvider>
)

export default App
