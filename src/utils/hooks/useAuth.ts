import { useAuthContext } from "../contexts/AuthContext"
import useConstants from "./useConstants"

const useAuth = () => {
  const constants = useConstants()
  const baseUrl = `${constants.env.apiSecurity}/api/jwt`

  const signIn = async (
    username: string,
    password: string
  ): Promise<{
    status: { isSuccess: boolean; message: string }
    data: { accessToken: string, refreshToken: string }
  }> => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error("[useAuth] signIn failed!", e)
      return {
        status: {
          isSuccess: false,
          message: "Unable to authenticate with server!",
        },
        data: {
          accessToken: "",
          refreshToken: ""
        },
      }
    }
  }

  const refresh = async (
    accessToken: string,
    refreshToken: string
  ): Promise<{
    status: { isSuccess: boolean; message: string }
    data: { accessToken: string, refreshToken: string }
  }> => {
    try {
      const response = await fetch(`${baseUrl}/refresh`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        }),
      })
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error("[useAuth] refresh failed!", e)
      return {
        status: {
          isSuccess: false,
          message: "Unable to authenticate with server!",
        },
        data: {
          accessToken: "",
          refreshToken: ""
        },
      }
    }
  }

  return { signIn, refresh }
}

export default useAuth
