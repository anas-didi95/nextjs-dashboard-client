import React, { createContext, ReactNode, useEffect, useState } from "react"

interface IAuthContext {
  isAuth: () => void
  setAuth: (status: boolean) => void
}

const AuthContext = createContext<IAuthContext>({ isAuth: () => { }, setAuth: () => { } })

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  type TData = {
    isAuth: boolean
  }
  const [data, setData] = useState<TData>({ isAuth: false })

  const isAuth = () => data.isAuth
  const setAuth = (status: boolean) => setData(prev => ({ ...prev, isAuth: status }))

  return <AuthContext.Provider value={{ isAuth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
export { AuthProvider }
