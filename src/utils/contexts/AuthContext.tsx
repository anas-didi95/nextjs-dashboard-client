import { useRouter } from "next/router"
import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react"
import useAuth from "../hooks/useAuth"
import useConstants from "../hooks/useConstants"
import { useNotificationContext } from "./NotificationContext"

interface IAuthContext {
  isAuth: () => boolean
  setAuth: (accessToken: string, refreshToken: string, username: string) => void
  clearAuth: () => void
  getAccessToken: () => string
  getUsername: () => string
}

const AuthContext = createContext<IAuthContext>({
  isAuth: () => false,
  setAuth: () => { },
  clearAuth: () => { },
  getAccessToken: () => "",
  getUsername: () => ""
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  type TData = {
    accessToken: string
    refreshToken: string
    username: string
  }
  const [data, setData] = useState<TData>({ accessToken: "", refreshToken: "", username: "" })
  const auth = useAuth()
  const notificationContext = useNotificationContext()
  const router = useRouter()
  const constants = useConstants()

  const isAuth = () => !!data.accessToken
  const setAuth = (accessToken: string, refreshToken: string, username: string) =>
    setData({ accessToken, refreshToken, username })
  const clearAuth = () => setData({ accessToken: "", refreshToken: "", username: "" })
  const getAccessToken = () => data.accessToken
  const getUsername = () => data.username

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | null = null
    if (!!data.refreshToken) {
      const refreshIntervalInMinutes = Number(
        constants.env.refreshIntervalInMinute
      )
      refreshInterval = setInterval(async () => {
        const responseBody = await auth.refresh(
          data.accessToken,
          data.refreshToken
        )

        if (responseBody.status.isSuccess) {
          const { accessToken, refreshToken } = responseBody.data
          setData(prev => ({ ...prev, accessToken, refreshToken }))
          //console.log("[AuthContext] " + responseBody.status.message)
        } else {
          console.error("[AuthContext] responseBody", responseBody)
          clearAuth()
          notificationContext.setSaveMessage(
            "Refresh token failed!",
            responseBody.status.message,
            "is-danger"
          )
          router.replace("/")
        }
      }, refreshIntervalInMinutes * 60 * 1000)
      //console.log("[AuthContext] Refresh interval start")
    }

    return () => {
      if (!!refreshInterval) {
        clearInterval(refreshInterval)
        //console.log("[AuthContext] Refresh interval end")
      }
    }
  }, [data.refreshToken])

  return (
    <AuthContext.Provider
      value={{ isAuth, setAuth, clearAuth, getAccessToken, getUsername }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }
