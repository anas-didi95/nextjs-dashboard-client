import {
  initialResponseError,
  TResponseError,
  TClaim,
  TUser,
  TPermission,
} from "../types"
import useConstants from "./useConstants"

const useSecurityService = () => {
  const constants = useConstants()

  const signIn = async (
    username: string,
    password: string
  ): Promise<
    { accessToken: string; refreshToken: string } | TResponseError
  > => {
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
    const response = await fetch(`${constants.env.apiSecurity}/auth/refresh`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    const responseBody = await response.json()
    return responseBody
  }

  const check = async (
    accessToken: string
  ): Promise<{ user: TClaim } | TResponseError> => {
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
  }

  const getUserList = async (
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

  const getUserById = async (
    id: string,
    accessToken: string
  ): Promise<{ responseBody: TUser | TResponseError; status: number }> => {
    const response = await fetch(`${constants.env.apiSecurity}/graphql`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `query ($id: String!, $format: String) {
            getUserById(id: $id) {
              id
              username
              fullName
              email
              lastModifiedBy {
                id
                username
              }
              lastModifiedDate(format: $format)
              version
              telegramId
              permissions
            }
          }`,
        variables: {
          id,
          format: "yyyy-MM-dd HH:mm:ss",
        },
      }),
    })
    const responseBody = await response.json()
    const { status } = response
    if (status === 200) {
      return { responseBody: responseBody.data.getUserById, status }
    } else {
      return { responseBody, status }
    }
  }

  const getPermissionList = async (
    accessToken: string
  ): Promise<{
    responseBody: TPermission[] | TResponseError
    status: number
  }> => {
    const response = await fetch(`${constants.env.apiSecurity}/graphql`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: `query {
            getPermissionList {
              id
            }
          }`,
      }),
    })
    const responseBody = await response.json()
    const { status } = response
    if (status === 200) {
      return { responseBody: responseBody.data.getPermissionList, status }
    } else {
      return { responseBody, status }
    }
  }

  const updateUser = async (
    user: TUser,
    accessToken: string
  ): Promise<{
    responseBody: { id: string } | TResponseError
    status: number
  }> => {
    const response = await fetch(
      `${constants.env.apiSecurity}/user/${user.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fullName: user.fullName,
          email: user.email,
          version: user.version,
          telegramId: user.telegramId,
          permissions: user.permissions,
        }),
      }
    )
    const responseBody = await response.json()
    const { status } = response
    return { responseBody, status }
  }

  const createUser = async (
    data: {
      username: string
      password: string
      fullName: string
      email: string
      telegramId: string
      permissions: string[]
    },
    accessToken: string
  ): Promise<{
    responseBody: { id: string } | TResponseError
    status: number
  }> => {
    const response = await fetch(`${constants.env.apiSecurity}/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        email: data.email,
        telegramId: data.telegramId,
        permissions: data.permissions,
      }),
    })
    const responseBody = await response.json()
    const { status } = response
    return { responseBody, status }
  }

  return {
    signIn,
    signOut,
    refresh,
    check,
    getUserList,
    getUserById,
    getPermissionList,
    updateUser,
    createUser,
  }
}

export default useSecurityService
