import React, { createContext, ReactNode, useContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { initialUser, TUser } from "../types"

const initialState: TState = {
  accessToken: "",
  sessionDate: new Date(),
  user: initialUser,
}

const AuthContext = createContext<TContext>({
  setToken: (a, b) => {},
  setUser: (a) => {},
  getAccessToken: () => "",
  getUser: () => ({ ...initialState.user }),
  getSessionDate: () => new Date(),
  isAuth: () => false,
  clear: () => {},
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const localStorage = useLocalStorage()
  const [data, setData] = useState<TState>(initialState)

  const setToken = (accessToken: string, refreshToken: string) => {
    setData({ ...initialState, accessToken, sessionDate: new Date() })
    localStorage.set("refreshToken", refreshToken)
  }
  const setUser = (user: TUser) => setData({ ...data, user })
  const getAccessToken = () => data.accessToken
  const getUser = () => data.user
  const getSessionDate = () => data.sessionDate
  const isAuth = () => !!data.accessToken
  const clear = () => {
    setData(initialState)
    localStorage.clear()
  }

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
      }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }

type TContext = {
  setToken: (accessToken: string, refreshToken: string) => void
  setUser: (user: TUser) => void
  getAccessToken: () => string
  getUser: () => TUser
  getSessionDate: () => Date
  isAuth: () => boolean
  clear: () => void
}
type TState = {
  accessToken: string
  sessionDate: Date
  user: TUser
}
