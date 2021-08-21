import { useAuthContext } from "../contexts/AuthContext"
import { initialResponseError, TResponseError } from "../types"
import useConstants from "./useConstants"

const useSecurityService = () => {
  const constants = useConstants()
  const authContext = useAuthContext()

  const signIn = async (
    username: string,
    password: string
  ): Promise<
    { accessToken: string; refreshToken: string } | TResponseError
  > => {
    try {
      const response = await fetch(`${constants.env.apiSecurity}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
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
      const response = await fetch(`${constants.env.apiSecurity}/auth/logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.getAccessToken()}`,
        },
      })
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

  const refresh = async (
    refreshToken: string
  ): Promise<
    { accessToken: string; refreshToken: string } | TResponseError
  > => {
    try {
      const response = await fetch(
        `${constants.env.apiSecurity}/auth/refresh`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
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
    refresh,
  }
}

export default useSecurityService
