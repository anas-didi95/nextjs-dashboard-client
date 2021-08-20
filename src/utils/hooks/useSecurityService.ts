import { useAuthContext } from "../contexts/AuthContext"
import { initialResponseError, TResponseError } from "../types"

const useSecurityService = () => {
  const authContext = useAuthContext()

  const signIn = async (
    username: string,
    password: string
  ): Promise<
    { accessToken: string; refreshToken: string } | TResponseError
  > => {
    try {
      const response = await fetch(
        "https://api.anasdidi.dev/security/auth/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      )
      const responseBody = await response.json()
      return responseBody
    } catch (error) {
      console.error("[useSecurityService] signIn failed!", error)
      return {
        ...initialResponseError,
        message: error.message,
      }
    }
  }

  const signOut = async (): Promise<{ id: string } | TResponseError> => {
    try {
      const response = await fetch(
        "https://api.anasdidi.dev/security/auth/logout",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.getAccessToken()}`,
          },
        }
      )
      const responseBody = await response.json()
      return responseBody
    } catch (error) {
      console.error("[useSecurityService] signOut failed!", error)
      return {
        ...initialResponseError,
        message: error.message,
      }
    }
  }

  const refresh = async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | TResponseError
  > => {
    try {
      const response = await fetch(
        "https://api.anasdidi.dev/security/auth/refresh",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refreshToken}`
          },
        }
      )
      const responseBody = await response.json()
      return responseBody
    } catch (error) {
      console.error("[useSecurityService] refresh failed!", error)
      return {
        ...initialResponseError,
        message: error.message,
      }
    }
  }

  return {
    signIn,
    signOut,
    refresh
  }
}

export default useSecurityService
