import useConstants from "./useConstants"

export type Claims = {
  userId: string
  username: string
  fullName: string
  permissions: string[]
}
const useAuth = () => {
  const constants = useConstants()
  const baseUrl = `${constants.env.apiSecurity}/api/jwt`

  const signIn = async (
    username: string,
    password: string
  ): Promise<{
    status: { isSuccess: boolean; message: string }
    data: { accessToken: string; refreshToken: string }
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
          refreshToken: "",
        },
      }
    }
  }

  const refresh = async (
    accessToken: string,
    refreshToken: string
  ): Promise<{
    status: { isSuccess: boolean; message: string }
    data: { accessToken: string; refreshToken: string }
  }> => {
    try {
      const response = await fetch(`${baseUrl}/refresh`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      })
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error("[useAuth] refresh failed!", e)
      return {
        status: {
          isSuccess: false,
          message: "Unable to refresh token with server!",
        },
        data: {
          accessToken: "",
          refreshToken: "",
        },
      }
    }
  }

  const signOut = async (
    accessToken: string
  ): Promise<{
    status: { isSuccess: boolean; message: string }
  }> => {
    try {
      const response = await fetch(`${baseUrl}/logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error("[useAuth] signOut failed!", e)
      return {
        status: {
          isSuccess: false,
          message: "Unable to sign out with server!",
        },
      }
    }
  }

  const check = async (accessToken: string): Promise<Claims> => {
    try {
      const response = await fetch(`${baseUrl}/check`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const responseBody = await response.json()

      return responseBody.data
    } catch (e) {
      console.error("[useAuth] check failed!", e)
      return {
        userId: "",
        fullName: "",
        permissions: [],
        username: "",
      }
    }
  }

  return { signIn, refresh, signOut, check }
}

export default useAuth
