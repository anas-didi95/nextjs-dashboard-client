import { useAuthContext } from "../contexts/AuthContext"
import useConstants from "./useConstants"

export type TUser = {
  id: string
  username: string
  fullName: string
  email: string
  password: string
  telegramId: string
  lastModifiedDate: string
  version: number
}
const useSecurityService = () => {
  const constants = useConstants()
  const authContext = useAuthContext()

  const getUserList = async (): Promise<TUser[]> => {
    try {
      const response = await fetch(`${constants.env.apiSecurity}/graphql`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.getAccessToken()}`,
        },
        body: JSON.stringify({
          query: `
            query {
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

      return responseBody.data.getUserList
    } catch (e) {
      console.error("[useSecurityService] getUserList failed!", e)
      return []
    }
  }

  const createUser = async (
    user: TUser
  ): Promise<{
    status: { isSuccess: boolean; message: string }
    data: { id: string }
  }> => {
    try {
      const response = await fetch(`${constants.env.apiSecurity}/api/user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.getAccessToken()}`,
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          fullName: user.fullName,
          email: user.email,
          telegramId: user.telegramId,
        }),
      })
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error("[useSecurityService] createUser failed!", e)
      return {
        status: {
          isSuccess: false,
          message: constants.error.referConsoleLogDetails,
        },
        data: {
          id: "",
        },
      }
    }
  }

  const getUserById = async (id: string): Promise<TUser> => {
    try {
      const response = await fetch(`${constants.env.apiSecurity}/graphql`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.getAccessToken()}`,
        },
        body: JSON.stringify({
          query: `
            query($id: String!, $format: String) {
              getUserById(id: $id) {
                id
                username
                fullName
                email
                lastModifiedDate(format: $format) version
              }
            }`,
          variables: {
            id: id,
            format: "yyyy-MM-dd HH:mm:ss",
          },
        }),
      })
      const responseBody = await response.json()

      return responseBody.data.getUserById
    } catch (e) {
      console.error("[useSecurityService] getUserById failed!", e)
      return {
        email: "",
        fullName: "",
        id: "",
        password: "",
        telegramId: "",
        username: "",
        lastModifiedDate: "",
        version: -1,
      }
    }
  }

  const updateUser = async (
    user: TUser
  ): Promise<{
    status: { isSuccess: boolean; message: string }
    data: { id: string }
  }> => {
    try {
      const response = await fetch(
        `${constants.env.apiSecurity}/api/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.getAccessToken()}`,
          },
          body: JSON.stringify({
            fullName: user.fullName,
            email: user.email,
            version: user.version,
            telegramId: user.telegramId,
          }),
        }
      )
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error("[useSecurityService] updateUser failed!", e)
      return {
        status: {
          isSuccess: false,
          message: constants.error.referConsoleLogDetails,
        },
        data: {
          id: "",
        },
      }
    }
  }

  return { getUserList, createUser, getUserById, updateUser }
}

export default useSecurityService
