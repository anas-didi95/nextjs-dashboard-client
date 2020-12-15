import "../styles/app.scss"
import { AuthProvider } from "../src/utils/contexts/AuthContext"
import { NotificationProvider } from "../src/utils/contexts/NotificationContext"

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  </AuthProvider>
)

export default App
