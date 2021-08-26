import React, { createContext, ReactNode, useContext, useState } from "react"
import { useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import useSecurityService from "../hooks/useSecurityService"
import { initialUser, TUser } from "../types"

const initialState: TState = {
  accessToken: "",
  sessionDate: new Date(),
  user: initialUser,
}

const AuthContext = createContext<TContext>({
  setToken: (a, b) => {},
  getAccessToken: () => "",
  getUser: () => ({ ...initialState.user }),
  getSessionDate: () => new Date(),
  isAuth: () => false,
  clear: () => {},
  hasRefreshToken: () => false,
  refresh: async () => "",
  setUser: async () => {},
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const localStorage = useLocalStorage()
  const securityService = useSecurityService()
  const [data, setData] = useState<TState>(initialState)

  const setToken = (accessToken: string, refreshToken: string) => {
    setData({ ...initialState, accessToken, sessionDate: new Date() })
    localStorage.set("refreshToken", refreshToken)
  }
  const setUser = async () => {
    const responseBody = await securityService.check(data.accessToken)
    if ("userId" in responseBody) {
      const user = responseBody as TUser
      setData((prev) => ({ ...prev, user }))
    }
  }
  const getAccessToken = () => data.accessToken
  const getUser = () => data.user
  const getSessionDate = () => data.sessionDate
  const isAuth = () => !!data.accessToken
  const clear = () => {
    setData(initialState)
    localStorage.clear()
  }
  const hasRefreshToken = () => !!localStorage.get("refreshToken")
  const refresh = async () => {
    const refreshToken = localStorage.get("refreshToken")
    const responseBody = await securityService.refresh(refreshToken)
    if ("accessToken" in responseBody) {
      const { refreshToken, accessToken } = responseBody
      setToken(accessToken, refreshToken)
      return accessToken
    } else {
      return ""
    }
  }

  useEffect(() => {
    ;(async () => {
      if (!!data.accessToken) {
        await setUser()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.accessToken])

  return (
    <AuthContext.Provider
      value={{
        setToken,
        setUser,
        getAccessToken,
        getUser,
        getSessionDate,
        isAuth,
        clear,
        hasRefreshToken,
        refresh,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }

type TContext = {
  setToken: (accessToken: string, refreshToken: string) => void
  getAccessToken: () => string
  getUser: () => TUser
  getSessionDate: () => Date
  isAuth: () => boolean
  clear: () => void
  hasRefreshToken: () => boolean
  refresh: () => Promise<string>
  setUser: () => Promise<void>
}
type TState = {
  accessToken: string
  sessionDate: Date
  user: TUser
}
