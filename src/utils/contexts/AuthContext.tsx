import React, { createContext, ReactNode, useContext, useState } from "react"
import { initialUser, TUser } from "../types"

const initialState: TState = {
  accessToken: "",
  user: initialUser,
}

const AuthContext = createContext<TContext>({
  setToken: (a, b) => {},
  setUser: (a) => {},
  getAccessToken: () => "",
  getUser: () => ({ ...initialState.user }),
  isAuth: () => false,
  clear: () => {},
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<TState>(initialState)

  const setToken = (accessToken: string, refreshToken: string) => {
    setData({ ...initialState, accessToken: accessToken })
    window.localStorage.setItem("refreshToken", refreshToken)
  }
  const setUser = (user: TUser) => setData({ ...data, user })
  const getAccessToken = () => data.accessToken
  const getUser = () => data.user
  const isAuth = () => !!data.accessToken
  const clear = () => {
    setData(initialState)
    window.localStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{ setToken, setUser, getAccessToken, getUser, isAuth, clear }}>
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
  isAuth: () => boolean
  clear: () => void
}
type TState = {
  accessToken: string
  user: TUser
}
