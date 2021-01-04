import { useRouter } from "next/router"
import React, { createContext, ReactNode, useState, useContext, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useConstants from "../hooks/useConstants"
import { useNotificationContext } from "./NotificationContext"

interface IAuthContext {
  isAuth: () => boolean
  setAuth: (accessToken: string, refreshToken: string) => void
  clearAuth: () => void
  getAccessToken: () => string
}

const AuthContext = createContext<IAuthContext>({
  isAuth: () => false,
  setAuth: () => { },
  clearAuth: () => { },
  getAccessToken: () => "",
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  type TData = {
    accessToken: string,
    refreshToken: string
  }
  const [data, setData] = useState<TData>({ accessToken: "", refreshToken: "" })
  const auth = useAuth()
  const notificationContext = useNotificationContext()
  const router = useRouter()
  const constants = useConstants()

  const isAuth = () => !!data.accessToken
  const setAuth = (accessToken: string, refreshToken: string) =>
    setData((prev) => ({ ...prev, accessToken, refreshToken }))
  const clearAuth = () => setData({ accessToken: "", refreshToken: "" })
  const getAccessToken = () => data.accessToken

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | null = null;
    if (!!data.refreshToken) {
      const refreshIntervalInMinutes = Number(constants.env.refreshIntervalInMinute)
      refreshInterval = setInterval(async () => {
        const responseBody = await auth.refresh(data.accessToken, data.refreshToken)

        if (responseBody.status.isSuccess) {
          const { accessToken, refreshToken } = responseBody.data
          setData({ accessToken, refreshToken })
          console.log("[AuthContext] " + responseBody.status.message)
        } else {
          console.error("[AuthContext] responseBody", responseBody)
          clearAuth()
          notificationContext.setSaveMessage("Refresh token failed!", responseBody.status.message, "is-danger")
          router.replace("/")
        }
      }, refreshIntervalInMinutes * 60 * 1000)
      console.log("[AuthContext] Refresh interval start")
    }

    return () => {
      if (!!refreshInterval) {
        clearInterval(refreshInterval)
        console.log("[AuthContext] Refresh interval end")
      }
    }
  }, [data.refreshToken])

  return (
    <AuthContext.Provider
      value={{ isAuth, setAuth, clearAuth, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }
