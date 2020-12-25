import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import useConstants from "./useConstants"

export type TUser = {
  id: string
  username: string
  fullName: string
  email: string
  password: string
  telegramId: string
}
const useSecurityService = () => {
  const constants = useConstants()
  const authContext = useContext(AuthContext)

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
          query: `query { getUserList { id username fullName email } }`,
        }),
      })
      const responseBody = await response.json()

      return responseBody.data.getUserList
    } catch (e) {
      console.error("[useSecurityService] getUserList failed!", e)
      return []
    }
  }

  const createUser = async (user: TUser): Promise<{ status: { isSuccess: boolean, message: string }, data: { id: string } }> => {
    try {
      const response = await fetch(`${constants.env.apiSecurity}/api/user`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authContext.getAccessToken()}`
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          fullName: user.fullName,
          email: user.email,
          telegramId: user.telegramId
        })
      })
      const responseBody = await response.json()

      return responseBody
    } catch (e) {
      console.error("[useSecurityService] createUser failed!", e)
      return {
        status: {
          isSuccess: false,
          message: "Operation failed! Kindly refer console log for details."
        },
        data: {
          id: ""
        }
      }
    }
  }

  return { getUserList, createUser }
}


export default useSecurityService
