import React, { createContext, ReactNode, useContext, useState } from "react"

const AuthContext = createContext<TContext>({
  set: (a, b) => {},
  getAccessToken: () => "",
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

  return (
    <AuthContext.Provider value={{ set, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }

type TContext = {
  set: (accessToken: string, refreshToken: string) => void
  getAccessToken: () => string
}
type TState = {
  accessToken: string
  refreshToken: string
}
