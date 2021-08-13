const useSecurityService = () => {
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

  return {
    signIn,
  }
}

const initialResponseError: TResponseError = {
  code: "",
  message: "",
  traceId: "",
  errors: [""],
}

export default useSecurityService

export type TResponseError = {
  code: string
  message: string
  traceId: string
  errors: string[]
}
