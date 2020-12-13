import "../styles/app.scss"
import { AuthProvider } from "../src/utils/contexts/AuthContext"

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
)

export default App
