import React, { createContext, ReactNode, useState } from "react"

interface IAuthContext {
  isAuth: () => boolean
  setAuth: (accessToken: string) => void
}

const AuthContext = createContext<IAuthContext>({
  isAuth: () => false,
  setAuth: () => { },
})

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  type TData = {
    accessToken: string
  }
  const [data, setData] = useState<TData>({ accessToken: "" })

  const isAuth = () => !!data.accessToken
  const setAuth = (accessToken: string) =>
    setData((prev) => ({ ...prev, accessToken }))

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthProvider }
