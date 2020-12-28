import React, { createContext, ReactNode, useState, useContext } from "react"

interface IAuthContext {
  isAuth: () => boolean
  setAuth: (accessToken: string) => void
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
    accessToken: string
  }
  const [data, setData] = useState<TData>({ accessToken: "" })

  const isAuth = () => !!data.accessToken
  const setAuth = (accessToken: string) =>
    setData((prev) => ({ ...prev, accessToken }))
  const clearAuth = () => setData({ accessToken: "" })
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
