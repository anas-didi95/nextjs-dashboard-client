const useAuth = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_SECURITY}/api/jwt`

  const signIn = async (
    username: string,
    password: string
  ): Promise<{
    status: { isSuccess: boolean; message: string }
    data: { accessToken: string }
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
        },
      }
    }
  }

  return { signIn }
}

export default useAuth
