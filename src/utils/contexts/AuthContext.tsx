import React, { createContext, ReactNode, useState, useContext } from "react"

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

  const isAuth = () => !!data.accessToken
  const setAuth = (accessToken: string, refreshToken: string) =>
    setData((prev) => ({ ...prev, accessToken, refreshToken }))
  const clearAuth = () => setData({ accessToken: "", refreshToken: "" })
  const getAccessToken = () => data.accessToken

  return (
    <AuthContext.Provider
      value={{ isAuth, setAuth, clearAuth, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }
