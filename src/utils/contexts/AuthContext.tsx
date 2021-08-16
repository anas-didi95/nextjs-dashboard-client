import React, { createContext, ReactNode, useContext, useState } from "react"

const AuthContext = createContext<TContext>({
  set: (a, b) => {},
  getAccessToken: () => "",
  isAuth: () => false,
})

const initialState: TState = {
  accessToken: "",
  refreshToken: "",
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<TState>(initialState)

  const set = (accessToken: string, refreshToken: string) =>
    setData({ accessToken, refreshToken })
  const getAccessToken = () => data.accessToken
  const isAuth = () => !!data.accessToken && !!data.refreshToken

  return (
    <AuthContext.Provider value={{ set, getAccessToken, isAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }

type TContext = {
  set: (accessToken: string, refreshToken: string) => void
  getAccessToken: () => string
  isAuth: () => boolean
}
type TState = {
  accessToken: string
  refreshToken: string
}
