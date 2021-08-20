import React, { createContext, ReactNode, useContext, useState } from "react"

const AuthContext = createContext<TContext>({
  set: (a, b) => { },
  getAccessToken: () => "",
  isAuth: () => false,
  clear: () => { },
})

const initialState: TState = {
  accessToken: "",
  refreshToken: "",
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<TState>(initialState)

  const set = (accessToken: string, refreshToken: string) => {
    setData({ accessToken, refreshToken })
    window.localStorage.setItem("refreshToken", refreshToken)
  }
  const getAccessToken = () => data.accessToken
  const isAuth = () => !!data.accessToken && !!data.refreshToken
  const clear = () => {
    setData(initialState)
    window.localStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ set, getAccessToken, isAuth, clear }}>
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
  clear: () => void
}
type TState = {
  accessToken: string
  refreshToken: string
}
