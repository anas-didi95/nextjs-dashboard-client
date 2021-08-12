const useSecurityService = () => {
  const signIn = async (
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
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
      console.error("[useSecurityService] sign failed!", error)
      return {
        accessToken: "",
        refreshToken: "",
      }
    }
  }

  return {
    signIn,
  }
}

export default useSecurityService

export type TResponseError = {
  code: string
  message: string
  traceId: string
  errors: string[]
}
