import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import useSecurityService from "../hooks/useSecurityService"
import { initialClaim, TClaim } from "../types"

const initialState: TState = {
  accessToken: "",
  sessionDate: new Date(),
  claim: initialClaim,
}

const AuthContext = createContext<TContext>({
  setToken: (a, b) => {},
  getAccessToken: () => "",
  getClaim: () => ({ ...initialState.claim }),
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
      const claim = responseBody as TClaim
      setData((prev) => ({ ...prev, claim }))
    }
  }
  const getAccessToken = () => data.accessToken
  const getClaim = () => data.claim
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
        getClaim,
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
  getClaim: () => TClaim
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
  claim: TClaim
}
