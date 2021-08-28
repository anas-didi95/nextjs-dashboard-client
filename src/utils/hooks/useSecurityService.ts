import { initialResponseError, TResponseError, TClaim, TUser } from "../types"
import useConstants from "./useConstants"

const useSecurityService = () => {
  const constants = useConstants()

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

  const signOut = async (
    accessToken: string
  ): Promise<{
    responseBody: { id: string } | TResponseError
    status: number
  }> => {
    const response = await fetch(`${constants.env.apiSecurity}/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const responseBody = await response.json()
    const { status } = response
    return { responseBody, status }
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

  const check = async (
    accessToken: string
  ): Promise<{ user: TClaim } | TResponseError> => {
    try {
      const response = await fetch(`${constants.env.apiSecurity}/auth/check`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const responseBody = await response.json()
      return responseBody
    } catch (error) {
      console.error("[useSecurityService] check failed!", error)
      return {
        ...initialResponseError,
        message: error.message,
      }
    }
  }

  const getUsers = async (
    accessToken: string
  ): Promise<{ responseBody: TUser[] | TResponseError; status: number }> => {
    const response = await fetch(`${constants.env.apiSecurity}/graphql`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `query {
          getUserList {
            id
            username
            fullName
            email
          }
        }`,
      }),
    })
    const responseBody = await response.json()
    const { status } = response
    if (status === 200) {
      return { responseBody: responseBody.data.getUserList, status }
    } else {
      return { responseBody, status }
    }
  }

  return {
    signIn,
    signOut,
    refresh,
    check,
    getUsers,
  }
}

export default useSecurityService
